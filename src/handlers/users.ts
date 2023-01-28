import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../services/auth'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(parseInt(req.params.id))
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        }
        const newUser = await store.create(user)
        var token = jwt.sign({user: newUser}, ((process.env.TOKEN_SECRET as unknown) as string))
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const u = await store.authenticate(req.body.username, req.body.password)
        var token = jwt.sign({user: u}, ((process.env.TOKEN_SECRET as unknown) as string))
        res.json(token)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.post('/sign-in', authenticate)
}

export default users_routes