import { OrgsRepository } from '@/repositories/orgs-repository'
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
  constructor(private orgsRepository: OrgsRepository) {}

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

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new Error('Org already exists.')
    }

    const org = await this.orgsRepository.create({
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
