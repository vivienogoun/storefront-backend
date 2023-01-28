import express, { Request, Response} from 'express'
import { Order, OrderStore } from '../models/order'
import verifyAuthToken from '../services/auth'

const store = new OrderStore()

const currentOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.currentOrder(parseInt(req.params.id))
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orders_routes = (app: express.Application) => {
    app.get('/users/:id/order', verifyAuthToken, currentOrder)
}

export default orders_routes