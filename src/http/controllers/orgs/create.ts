import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
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

  console.log(createBodySchema.parse(request.body))

  return reply.status(201).send()
}
