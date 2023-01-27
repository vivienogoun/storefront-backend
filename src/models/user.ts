import client from "../database";

export type User = {
    id?: Number;
    firstname: String;
    lastname: String;
    password_digest: String;
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
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password_digest])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not create user ${u.firstname}. Error: ${err}`)
        }
    }
}