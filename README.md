# Node Auth Service

I spent more time than expected configuring the npm run dev workflow. I had previously worked with nodemon and wanted to use ts-node-dev, but the setup turned out to be more involved than I anticipated. That said, I strongly believe in TypeScript, so I was determined to make it work properly.

I also used AI assistance to generate regular expressions and to help validate my controllers and services.

As next steps, I would:

- Add new routes to fetch data from a database
- Implement JWT-based authentication via middleware, validating tokens issued from the /login endpoint
- On the frontend, store the JWT in cookies and attach it to the Authorization header using an HTTP interceptor
- Publish the Dockerfiles as images to Docker Hub.

**TypeScript authentication app using Express and Redis.**

---

## Overview

This repository contains a minimal auth service built with TypeScript, Express, and Redis for session/temporary storage. It includes a development Docker setup, TypeScript configuration.

---

## Features

- Express 5 with TypeScript
- Redis client for session/caching
- Environment-based configuration with `.env`
- Opinionated dev experience with `ts-node-dev` and Docker compose
- Basic middleware scaffolding (validation, logging, security headers)

---

## Getting Started

### Prerequisites

- Docker

### Environment

Copy `.env.example` (if present) to `.env` and fill values. Required variables used in the project:

- `PORT` — port to listen on (default: `3000`)
- `REDIS_URL` — e.g. `redis://redis:6379` when running with Docker
- `REDIS_PASSWORD` — leave empty if your Redis container has no password
- `APP_PEPPER` — secret pepper used for hashing
- `HASH_ALGO` — algorithm to use for hashing (e.g. `argon2`)
- `NODE_ENV` — `development | production`

> Tip: When running the services with Docker Compose, use `REDIS_URL=redis://redis:6379` so your app connects to the compose service named `redis` (not `localhost`).

---

## Development

A `Dockerfile.dev` and `docker-compose.yml` are included for a local dev environment.

Bring up services:

```bash
docker-compose up --build
```

---
