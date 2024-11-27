import { MakeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    type: z.string(),
    age: z.string(),
    size: z.string(),
  })

  const { name, about, type, age, size } = createBodySchema.parse(request.body)

  const createPet = MakeCreatePetUseCase()

  await createPet.execute({
    name,
    about,
    type,
    age,
    size,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
