# Find a Friend API

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
- [Features](#features)
- [Usage](#usage)
    - [Install Dependencies](#install-dependencies)
    - [Start the Database](#start-the-database)
    - [Run the Application](#run-the-application)
- [Endpoints](#endpoints)
- [Test](#test)
- [Application Rules](#aplication-rules)
    - [Business Rules](#business-rules)
    - [Non-functional Requirements](#non-functional-requirements)

## Overview

This Api is designed to manage pets for adoption and is built using [Node.js](https://nodejs.org/) following the **SOLID** principles. The project leverages [TypeScript](https://www.typescriptlang.org/) and the [Fastify](https://fastify.dev/) framework for high-performance routing.

For data managment, the API interacts with a [PostgreSQL](https://www.postgresql.org/) database, utilizing [Prisma](https://www.prisma.io/) as the ORM. The database environment is containerized with [Docker](https://www.docker.com/) for seamless deployment and management.

## Requirements

To run this project, ensure you have the following tools installed:
 - [Node.js](https://nodejs.org/)
 - [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Features

The API includes the following functionalities:
 - **Register Organizations (Orgs):** Organizations can register to the platform.
 - **Login:** Orgs can securely log in to manage their account.
 - **Pet Management:**
    - Orgs can register pets for adoption.
    - Pets can be listed by city.
    - Filter pets by characteristics such as type and size.
 - **Pet Profile**: Retrieve detailed profiles of individual pets.

## Usage

### Install dependencies
Ensure you have all required packages installed
```
npm install
```

### Start the Database
Spin up the database using Docker
```
docker compose up -d
```
### Run the Application
#### Development Environment
To start the server in development mode:
```
npm run start:dev
```

#### Production Environment

Compile the application for production:
```
npm run build
```

Start the server in production mode:
```
npm start
```

By default, the server listens on **port 3333**.

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
