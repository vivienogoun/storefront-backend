import client from "../database";
import bcrypt from 'bcrypt'

export type User = {
    id?: Number;
    firstname: String;
    lastname: String;
    username: String;
    password: String;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: number): Promise<User | undefined> {
        try {
            const sql = 'SELECT * FROM users WHERE id=$1'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const {
                BCRYPT_PASSWORD,
                SALT_ROUNDS,
            } = process.env
            const hash = bcrypt.hashSync(
                u.password + ((BCRYPT_PASSWORD as unknown) as string),
                parseInt(((SALT_ROUNDS as unknown) as string))
            )
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not create user ${u.username}. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const sql = 'SELECT password_digest FROM users WHERE username=$1'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [username])
            if(result.rows.length) {
                const user = result.rows[0]
                if(bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password_digest)) {
                    return user
                }
            }
            return null
        } catch (err) {
            throw new Error(`Could not sign in user ${username}. Error: ${err}`)
        }
    }
}