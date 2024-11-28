import { MakeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listParamsSchema = z.object({
    city: z.string(),
  })

  const listBodySchema = z.object({
    type: z.string().optional(),
    size: z.string().optional(),
  })

  const { city } = listParamsSchema.parse(request.params)

  const body = listBodySchema.parse(request.body)

  const { type, size } = body

  const fetchPets = MakeFetchPetsUseCase()

  const pets = await fetchPets.execute({
    city,
    type,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
