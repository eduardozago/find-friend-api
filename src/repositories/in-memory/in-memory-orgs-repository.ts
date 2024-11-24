import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      city: data.city,
      state: data.state,
      street: data.street,
      number: data.number,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.items.push(org)

    return org
  }
}
