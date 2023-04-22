import request from 'supertest';

import app from '../../app';
import { ApiStatus, StatusCode } from '../../types';

describe('GET /', () => {
  it('Should Return "Hello, world!"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.status).toBe(ApiStatus.SUCCESS);
    expect(response.body.message).toBe('HELLO_WORLD');
  });
});
