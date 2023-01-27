import client from "../database";

export type Product = {
    id?: Number;
    title: String;
    price: Number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product | undefined> {
        try {
            const sql = 'SELECT * FROM products WHERE id=$1'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (title, price) VALUES ($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [p.title, p.price])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not create product ${p.title}. Error: ${err}`)
        }
    }
}