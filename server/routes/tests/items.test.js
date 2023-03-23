const request = require('supertest');
const app = require('../../app');
const { Item } = require('../models');


describe('GET /items', () => {
        test('should return all items', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('items');
        });
    });


describe('GET /:id', () => {
    test('should return the item with the given id', async () => {
        const item = await Item.create({
            title: 'Test Item',
            price: 10,
            description: 'Test Description',
            category: 'Test Category',
            image: 'test.jpg'
        });
        const res = await request(app).get(`/${item.id}`);
        expect(res.status).toBe(200);
        expect(res.body.title).toEqual(item.title);
    });
    test('should return error for invalid id', async () => {
        const res = await req(app).get('/0');
        expect(res.status).toBe(404);
    });
});

describe('POST /', () => {
    test('should create a new item', async () => {
        const newItem = {
            title: 'Test Item',
            price: 10,
            description: 'Test Description',
            category: 'Test Category',
            image: 'test.jpg'
        };
        const res = await req(app).post('/').send(newItem);
        expect(res.status).toBe(201);
        expect(res.body.length).toBeGreaterThan(0);
        const createdItem = await Item.findByPk(res.body.id);
        expect(createdItem).not.toBeNull();
    });
    test('should return error for invalid item', async () => {
        const invalidItem = {
            title: '',
            price: 'not-a-number',
            description: '',
            category: '',
            image: ''
        };
        const res = await req(app).post('/').send(invalidItem);
        expect(res.status).toBe(400);
    });
});

describe('DELETE /:id', () => {
    test('should delete the item with the given id', async () => {
        const item = await Item.create({
            title: 'Test Item',
            price: 10,
            description: 'Test Description',
            category: 'Test Category',
            image: 'test.jpg'
        });
        const res = await req(app).delete(`/${item.id}`);
        expect(res.status).toBe(200);
        const deletedItem = await Item.findByPk(item.id);
        expect(deletedItem).toBeNull();
    });
});

describe('PUT /:id', () => {
    test('should update the item with the given id', async () => {
        const item = await Item.create({
            title: 'Test Item',
            price: 10,
            description: 'Test Description',
            category: 'Test Category',
            image: 'test.jpg'
        });
        const updatedItem = {
            title: 'Updated Item',
            price: 20,
            description: 'Updated Description',
            category: 'Updated Category',
            image: 'updated.jpg'
        };
        const res = await req(app).put(`/${item.id}`).send(updatedItem);
        expect(res.status).toBe(200);
    });
});