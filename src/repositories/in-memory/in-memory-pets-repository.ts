import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      name: data.name,
      about: data.about,
      type: data.type,
      age: data.age,
      size: data.size,
      org_id: data.org,
    }

    this.items.push(pet)

    return pet
  }
}
