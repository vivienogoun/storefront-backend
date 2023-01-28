import { User, UserStore } from "../user";

const store = new UserStore()

describe('User Model Testing', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should add a user', async () => {
        const result = await store.create({
            firstname: 'John',
            lastname: 'Scott',
            username: 'johny',
            password: 'johny-pw'
        });
        expect(result).toBeTruthy();
    });
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    });
    it('show method should return the searched user or undefined if it doesn\'t exists', async () => {
        const result = await store.show(1);
        expect(result).toBeTruthy();
        /*expect(result).toEqual({
            id: 1,
            firstname: 'John',
            lastname: 'Scott',
            username: 'johny',
            password: 'johny-pw'
        });*/
    });
});