import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'New ORG',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    const { pet } = await sut.execute({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
