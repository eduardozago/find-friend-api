# Find a Friend API

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
- [Features](#features)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Test](#test)
- [Application Rules](#aplication-rules)
    - [Business Rules](#business-rules)
    - [Non-functional Requirements](#non-functional-requirements)

## Overview

This API uses [Node.js](https://nodejs.org/) to manage pets for adoption. This API project built with [TypeScript](https://www.typescriptlang.org/) and [Fastify](https://fastify.dev/) framework. The API interacts with a [PostgreSQL](https://www.postgresql.org/) database using [Prisma](https://www.prisma.io/) ORM for data management. The database is containerized using [Docker](https://www.docker.com/).

## Requirements

For this project, the following (essential for execution) resources were used:
 - [Node.js](https://nodejs.org/)
 - [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Features

## Usage

Install dependencies
```
npm install
```

Start and run database
```
docker compose up -d
```

## Endpoints

## Test

## Aplication Rules

### Functional Requirements

- [x] It must be possible to register a pet.
- [ ] It must be possible to list all pets available for adoption in a city.
- [ ] It must be possible to filter pets by their characteristics.
- [ ] It must be possible to view details of a pet available for adoption.
- [x] It must be possible to register as an ORG.
- [x] It must be possible to log in as an ORG.

### Business Rules

- [ ] To list pets, it is mandatory to provide the city.
- [ ] An ORG must have an address and a WhatsApp number.
- [ ] A pet must be associated with an ORG.
- [ ] A user who wants to adopt will contact the ORG via WhatsApp.
- [ ] All filters, except for the city, are optional.
- [ ] For an ORG to access the application as an admin, it must be logged in.

### Non-functional Requirements

- [x] The password must be encrypted.
- [x] Application data needs to be persisted in a PostgreSQL database.
- [ ] The authentication needs to be by a JWT (JSON Web Token).
