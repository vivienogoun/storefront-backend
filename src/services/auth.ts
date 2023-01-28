import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        const decoded = jwt.verify(((token as unknown) as string), ((process.env.TOKEN_SECRET as unknown) as string))
        next()
    } catch (err) {
        res.status(401)
    }
}

export default verifyAuthToken