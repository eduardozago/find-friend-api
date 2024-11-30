import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  data?,
  isAdmin = false,
) {
  const newOrg = {
    name: 'New ORG',
    email: 'org@example.com',
    password_hash: await hash('123456', 6),
    role: isAdmin ? 'ADMIN' : 'MEMBER',
    phone: '(555) 123-4567',
    city: 'Springfield',
    state: 'IL',
    street: 'Maple Avenue',
    number: '1234',
    latitude: 39.7817,
    longitude: -89.6501,
  }

  const org = await prisma.org.create({
    data: data || newOrg,
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'org@example.com' || data.email,
      password: '123456',
    })

  const { token } = authResponse.body

  const orgId = org.id

  return {
    token,
    orgId,
  }
}
