import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface createPetUseCaseRequest {
  name: string
  about: string
  type: string
  age: string
  size: string
  orgId: string
}

interface createPetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    type,
    age,
    size,
    orgId,
  }: createPetUseCaseRequest): Promise<createPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      type,
      age,
      size,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
