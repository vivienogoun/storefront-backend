import { Product, ProductStore } from "../product";

const store = new ProductStore()

describe('Product Model Testing', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    });
    it('show method should return the searched product or undefined if it doesn\'t exists', async () => {
        const result = await store.show(1);
        // expect(result).toBeUndefined();
        expect(result).toEqual({
            id: 1,
            title: 'laptop',
            price: 400
        });
    });
    it('create method should add a product', async () => {
        const result = await store.create({
            title: 'laptop',
            price: 400
        });
        expect(result).toBeTruthy();
    });
});