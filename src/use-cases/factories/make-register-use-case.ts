import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const OrgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUseCase(OrgsRepository)

  return registerUseCase
}
