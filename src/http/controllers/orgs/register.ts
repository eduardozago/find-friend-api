import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),

    city: z.string(),
    state: z.string(),
    street: z.string(),
    number: z.string(),

    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    name,
    email,
    password,
    phone,
    city,
    state,
    street,
    number,
    latitude,
    longitude,
  } = createBodySchema.parse(request.body)

  try {
    const OrgsRepository = new PrismaOrgsRepository()
    const registerUseCase = await new RegisterUseCase(OrgsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      city,
      state,
      street,
      number,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send() // TODO
  }

  return reply.status(201).send()
}
