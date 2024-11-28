import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'
import { list } from './list'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)

  app.get('/pets/:petId', profile)

  app.post('/pets/list/:city', list)
}
