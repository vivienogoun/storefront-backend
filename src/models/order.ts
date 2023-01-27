import client from "../database";

export type Order = {
    id?: Number;
    isactive?: Boolean;
    user_id?: Number; 
}

export class OrderStore {
    async currentOrder(userId: number): Promise<Order | undefined> {
        try {
            const sql = 'SELECT * FROM orders WHERE isactive=true AND user_id=$1'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [userId])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not get current order of user ${userId}. Error: ${err}`)
        }
    }
}