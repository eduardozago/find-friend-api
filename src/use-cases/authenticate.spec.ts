import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
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

    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate with wrong password', async () => {
    await orgsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
