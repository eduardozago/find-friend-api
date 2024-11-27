import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.findByCity(city)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const pets = []

    for (const org of orgs) {
      const orgPets = await this.petsRepository.findByOrg(org.id)
      pets.push(...orgPets)
    }

    return {
      pets,
    }
  }
}
