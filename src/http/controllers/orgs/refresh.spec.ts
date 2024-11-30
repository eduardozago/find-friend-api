import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'New ORG',
      email: 'org@example.com',
      password: '123456',
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
