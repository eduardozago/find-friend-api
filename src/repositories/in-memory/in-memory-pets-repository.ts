import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByCharacteristics(
    orgId: string,
    type?: string,
    size?: string,
  ): Promise<Pet[] | null> {
    let pets = this.items.filter((item) => item.org_id === orgId)

    if (pets.length === 0) {
      return null
    }

    if (type) {
      pets = pets.filter((pet) => pet.type === type)
    }

    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
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
