import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
  type?: string
  size?: string
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
    type,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.findByCity(city)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const pets = []

    if (type) {
      type = type.toLowerCase()
    }

    if (size) {
      size = size.toLowerCase()
    }

    for (const org of orgs) {
      const orgPets = await this.petsRepository.findByCharacteristics(
        org.id,
        type,
        size,
      )

      pets.push(...orgPets)
    }

    return {
      pets,
    }
  }
}
