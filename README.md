# Task-management-app

A real-time task management system featuring a Kanban-style dashboard. Built with Next.js and RTK Query for the frontend, it provides real-time updates via Socket.io. The backend, using NestJS in a microservice architecture, integrates Redis for caching, RabbitMQ for messaging, and MongoDB for storage. Developed with Node.js, TypeScript, and JWT Passport for secure authentication.

!['LLD'](https://drive.google.com/uc?export=view&id=10PdC2AleUeQhskpcEfGHDfsfRMU_fjm6)
Video: [https://www.youtube.com/watch?v=Hc79sDi3f0U](https://drive.google.com/file/d/1Tf515tsHDJ17eluLDGj2TQ9AuDwXqgxP/view?usp=sharing)
## Features

- Frontend: Next.js with RTK Query for efficient data fetching and real-time updates via Socket.io.
- Backend: NestJS microservices architecture with RESTful APIs for task management.
- Caching: Redis to enhance performance.
- Messaging: RabbitMQ for handling asynchronous events.
- Authentication: JWT Passport for secure user access.

# Getting Started

## Prerequisites
- Docker
## Installation

```bash
git clone https://github.com/nabeelktr/Task-management-app.git
cd Task-management-app
docker compose up
```

## Usage
- Access the application frontend at http://localhost:4000.
- You can view the API documentation through the following links:
    - [Postman Documentation](https://documenter.getpostman.com/view/36135082/2sA3kUG2hM)
    - Localhost(Swagger-Api): http://localhost:3001/api-docs

