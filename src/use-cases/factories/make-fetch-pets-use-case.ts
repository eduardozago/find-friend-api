import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets-use-case'

export function MakeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(petsRepository, orgsRepository)

  return fetchPetsUseCase
}
