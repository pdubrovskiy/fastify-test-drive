# Fastify API Platform 🚀

A modern, production-ready REST API platform built with Fastify framework, featuring TypeScript, Prisma ORM, JWT authentication, and Swagger documentation.

## 📝 Note
In this repository, I am refreshing my knowledge and skills in working with Fastify due to my constant work with NestJS 😅. 
<br>
<br>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=green&color=black)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=blue&color=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

## 🌟 Features

- 🔥 Built with Fastify for high performance
- 📚 TypeScript for type safety
- 🔐 JWT authentication
- 📝 API documentation with Swagger
- 🎯 Request/Response validation with Zod
- 🗄️ Database management with Prisma ORM
- ⚡ Hot reload development environment

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Fastify
- **ORM**: Prisma
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Authentication**: JWT

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pdubrovskiy/fastify-api-platform.git
cd fastify-api-platform
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
yarn prisma migrate dev
```

5. Start the development server:
```bash
yarn start
```

## 📚 API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/docs
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📝 Project Structure

```
src/
├── modules/         # Feature modules (user, auth, etc.)
├── utils/          # Utility functions and helpers
└── app.ts          # Application entry point
```
