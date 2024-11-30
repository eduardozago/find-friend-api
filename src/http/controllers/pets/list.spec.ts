import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateOrg } from '@/use-cases/utils/test/create-and-authenticate-org'
import { hash } from 'bcryptjs'

describe('List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    const firstOrg = await createAndAuthenticateOrg(app, undefined, true)
    const secondOrg = await createAndAuthenticateOrg(
      app,
      {
        name: 'Second Org',
        email: 'secondorg@example.com',
        password_hash: await hash('123123', 6),
        phone: '(555) 987-6543',
        city: 'Riverside',
        state: 'CA',
        street: 'Oak Street',
        number: '5678',
        latitude: 33.98,
        longitude: -117.375,
      },
      true,
    )

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${firstOrg.token}`)
      .send({
        name: 'Rocky',
        about: 'A friendly dog',
        type: 'Dog',
        age: '2 years',
        size: 'small',
        org: firstOrg.orgId,
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${secondOrg.token}`)
      .send({
        name: 'Luna',
        about: 'A playful rabbit who loves to hop around',
        type: 'rabbit',
        age: '1 year',
        size: 'medium',
        org: secondOrg.orgId,
      })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get list of pets by type', async () => {
    const city = 'Springfield'

    const response = await request(app.server).post(`/pets/list/${city}`).send({
      type: 'dog',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.pets[0].name).toEqual('Rocky')
  })

  it('should be able to get list of pets by size', async () => {
    const city = 'Springfield'

    const response = await request(app.server).post(`/pets/list/${city}`).send({
      size: 'small',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.pets[0].name).toEqual('Rocky')
  })

  it('should be able to get list of pets by type and size', async () => {
    const city = 'Springfield'

    const response = await request(app.server).post(`/pets/list/${city}`).send({
      type: 'dog',
      size: 'small',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.pets[0].name).toEqual('Rocky')
  })
})
