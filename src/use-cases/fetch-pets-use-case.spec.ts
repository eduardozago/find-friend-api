import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository, orgsRepository)
  })

  it('should be able to get a pet by city', async () => {
    const firstOrg = await orgsRepository.create({
      name: 'First ORG',
      email: 'firstorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    const secondOrg = await orgsRepository.create({
      name: 'Second ORG',
      email: 'secondorg@example.com',
      password_hash: await hash('123123', 6),
      phone: '(555) 987-6543',
      city: 'Riverside',
      state: 'CA',
      street: 'Oak Street',
      number: '5678',
      latitude: 33.98,
      longitude: -117.375,
    })

    await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: firstOrg.id,
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'A playful rabbit who loves to hop around',
      type: 'Rabbit',
      age: '1 year',
      size: 'Medium',
      org: firstOrg.id,
    })

    await petsRepository.create({
      name: 'Bella',
      about: 'A friendly cat',
      type: 'Cat',
      age: '1 years',
      size: 'Small',
      org: secondOrg.id,
    })

    const petsList = await sut.execute({
      city: 'Springfield',
    })

    expect(petsList.pets.length).toEqual(2)
  })

  it('should not be able to get a pet in undefined city', async () => {
    await expect(() =>
      sut.execute({
        city: 'Undefined City',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to get a pet by type', async () => {
    const org = await orgsRepository.create({
      name: 'First ORG',
      email: 'firstorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: org.id,
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'A playful dog who loves to hop around',
      type: 'Dog',
      age: '1 year',
      size: 'Medium',
      org: org.id,
    })

    const petsList = await sut.execute({
      city: 'Springfield',
      type: 'Dog',
    })

    expect(petsList.pets.length).toEqual(2)
  })

  it('should be able to get a pet by size', async () => {
    const org = await orgsRepository.create({
      name: 'First ORG',
      email: 'firstorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: org.id,
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'A playful dog who loves to hop around',
      type: 'Dog',
      age: '1 year',
      size: 'Medium',
      org: org.id,
    })

    const petsList = await sut.execute({
      city: 'Springfield',
      size: 'Small',
    })

    expect(petsList.pets.length).toEqual(1)
  })

  it('should be able to get a pet by type and size', async () => {
    const org = await orgsRepository.create({
      name: 'First ORG',
      email: 'firstorg@example.com',
      password_hash: await hash('123456', 6),
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    await petsRepository.create({
      name: 'Rocky',
      about: 'A friendly dog',
      type: 'Dog',
      age: '2 years',
      size: 'Small',
      org: org.id,
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'A playful rabbit who loves to hop around',
      type: 'Rabbit',
      age: '1 year',
      size: 'Medium',
      org: org.id,
    })

    const petsList = await sut.execute({
      city: 'Springfield',
      type: 'Rabbit',
      size: 'Medium',
    })

    expect(petsList.pets.length).toEqual(1)
  })
})
