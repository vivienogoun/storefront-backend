import { Order, OrderStore } from "../order";

const store = new OrderStore()

describe('Order Model Testing', () => {
    it('should have a currentOrder method', () => {
        expect(store.currentOrder).toBeDefined();
    });
    it('currentOrder method should return current order by user', async () => {
        const result = await store.currentOrder(1);
        expect(result).toBeUndefined();
    });
});