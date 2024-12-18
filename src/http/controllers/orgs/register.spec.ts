import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
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

    expect(response.statusCode).toEqual(201)
  })
})
