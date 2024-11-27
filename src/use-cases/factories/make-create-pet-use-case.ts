import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function MakeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return createPetUseCase
}
