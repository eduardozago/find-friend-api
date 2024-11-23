import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { Org } from '@prisma/client'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
  street: string
  number: string
  latitude: number
  longitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  async execute({
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const prismaOrgsRepository = new PrismaOrgsRepository()

    const org = await prismaOrgsRepository.create({
      name,
      email,
      password_hash,
      phone,
      city,
      state,
      street,
      number,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
