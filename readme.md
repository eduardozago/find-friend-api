# Find a Friend API

## Aplication Rules

### Functional Requirements
- [ ] It must be possible to register a user.
- [ ] It must be possible to authenticate a user.
- [ ] It must be possible to register a pet.
- [ ] It must be possible to list all pets available for adoption in a city.
- [ ] It must be possible to filter pets by their characteristics.
- [ ] It must be possible to view details of a pet available for adoption.
- [ ] It must be possible to register as an ORG.
- [ ] It must be possible to log in as an ORG.

### Business Rules

- [ ] To list pets, it is mandatory to provide the city.
- [ ] An ORG must have an address and a WhatsApp number.
- [ ] A pet must be associated with an ORG.
- [ ] A user who wants to adopt will contact the ORG via WhatsApp.
- [ ] All filters, except for the city, are optional.
- [ ] For an ORG to access the application as an admin, it must be logged in.

### Non-functional Requirements

- [ ] The user password must be encrypted.
- [ ] Application data needs to be persisted in a PostgreSQL database.
- [ ] The user needs to be authenticated by a JWT (JSON Web Token).