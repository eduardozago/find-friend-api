import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository = new InMemoryOrgsRepository()
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'New ORG',
      email: 'org@example.com',
      password: '123456',
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'New ORG',
      email: 'org@example.com',
      password: '123456',
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@example.com'

    await sut.execute({
      name: 'New ORG',
      email,
      password: '123456',
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      street: 'Maple Avenue',
      number: '1234',
      latitude: 39.7817,
      longitude: -89.6501,
    })

    await expect(() =>
      sut.execute({
        name: 'New ORG',
        email,
        password: '123456',
        phone: '(555) 123-4567',
        city: 'Springfield',
        state: 'IL',
        street: 'Maple Avenue',
        number: '1234',
        latitude: 39.7817,
        longitude: -89.6501,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
