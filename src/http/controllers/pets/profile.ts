import { MakeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = profileParamsSchema.parse(request.params)

  const getPet = MakeGetPetUseCase()

  const pet = await getPet.execute({
    petId,
  })

  return reply.status(200).send(pet)
}
