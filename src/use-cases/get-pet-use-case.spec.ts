import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { getPetUseCase } from './get-pet-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: getPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new getPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const org = await orgsRepository.create({
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

    const petCreated = await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: org.id,
    })

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    expect(pet.name).toEqual('Rocky')
  })

  it('should not be able to get an undefined pet', async () => {
    const org = await orgsRepository.create({
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

    const petCreated = await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: org.id,
    })

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    await expect(() =>
      sut.execute({
        petId: 'undefined-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
