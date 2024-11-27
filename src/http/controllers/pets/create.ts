import { MakeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send()
}
