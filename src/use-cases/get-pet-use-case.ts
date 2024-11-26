import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface getPetUseCaseRequest {
  petId: string
}

interface getPetUseCaseResponse {
  pet: Pet
}

export class getPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: getPetUseCaseRequest): Promise<getPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
