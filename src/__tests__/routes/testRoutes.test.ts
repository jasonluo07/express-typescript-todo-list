import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';
import { ApiStatuses } from '../../types/apiResponse';

describe('GET /', () => {
  it('Should Return "Hello, world!"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.status).toBe(ApiStatuses.SUCCESS);
    expect(response.body.message).toBe('HELLO_WORLD');
  });
});
