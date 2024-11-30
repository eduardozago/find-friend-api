import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateOrg } from '@/use-cases/utils/test/create-and-authenticate-org'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { token, orgId } = await createAndAuthenticateOrg(
      app,
      undefined,
      true,
    )

    const createdPet = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rocky',
        about: 'A friendly dog',
        type: 'Dog',
        age: '2 years',
        size: 'Small',
        org: orgId,
      })

    const petId = createdPet.body.pet.id

    const response = await request(app.server).get(`/pets/${petId}`)

    expect(response.statusCode).toEqual(200)
  })
})
