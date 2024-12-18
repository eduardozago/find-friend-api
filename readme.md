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

 - Create Org
 - Authenticate Org

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
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet available for adoption.
- [x] It must be possible to register as an ORG.
- [x] It must be possible to log in as an ORG.

### Business Rules

- [x] To list pets, it is mandatory to provide the city.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be associated with an ORG.
- [x] A user who wants to adopt will contact the ORG via WhatsApp.
- [x] All filters, except for the city, are optional.
- [x] For an ORG to access the application as an admin, it must be logged in.

### Non-functional Requirements

- [x] The password must be encrypted.
- [x] Application data needs to be persisted in a PostgreSQL database.
- [x] The authentication needs to be by a JWT (JSON Web Token).
