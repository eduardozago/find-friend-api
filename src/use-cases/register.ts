interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
  street: string
  number: string
  latitude: number
  longitude: number
}

export class RegisterUseCase {
  async execute(org: RegisterUseCaseRequest) {
    console.log(org)
  }
}
