import supertest from "supertest";
import app from "../../server";

const request = supertest(app)

describe('Endpoints Testing', () => {
    describe('Products endpoints testing', () => {
        it('get /products', async () => {
            const response = await request.get('/products')
            expect(response.status).toBe(200)
        })
        it('get /products/:id', async () => {
            const response = await request.get('/products/1')
            expect(response.status).toBe(200)
        })
        it('post /products', async () => {
            const response = await request.post('/products').send({
                title: 'laptop',
                price: 400
            })
            expect(response.status).toBe(200)
        })
    })
    describe('Users endpoints testing', () => {
        it('get /users', async () => {
            const response = await request.get('/users')
            expect(response.status).toBe(200)
        })
        it('get /users/:id', async () => {
            const response = await request.get('/users/1')
            expect(response.status).toBe(200)
        })
        it('post /users', async () => {
            const response = await request.post('/users').send({
                firstname: 'John',
                lastname: 'Scott',
                username: 'johny',
                password: 'johny-pw'
            })
            expect(response.status).toBe(200)
        })
    })
    describe('Orders endpoints testing', () => {
        it('get /users/:id/order', async () => {
            const response = await request.get('/users/1/order')
            expect(response.status).toBe(200)
        })
    })
})