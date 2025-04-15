# Fastlify Backend

A Fastify-based backend API boilerplate with JWT authentication.

## Features

- REST API with Fastify
- JWT authentication (signup and signin)
- PostgreSQL database
- Input validation with Zod
- Rate limiting
- CORS support

## Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL database

## Setup

1. Clone the repository

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a PostgreSQL database
   ```bash
   psql -U postgres
   ```
   (Use postgres as the default username or the one you created during installation.)
   ```sql
   CREATE DATABASE your_database_name;

   Connect to the database:
   ```bash
   \c your_database_name
   ```

   To test if the database is created successfully, you can run:
   ```bash
   psql -U postgres
   \l
   ```

4. Configure environment variables
   - Copy `.env.example` or create a new `.env` file with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=db_name
   JWT_SECRET=your-super-secret-jwt-key-replace-this-in-production
   JWT_EXPIRES_IN=1d
   ```

5. Initialize the database
   ```bash
   node src/db/setup.js
   ```

6. Start the server
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signup** - Register a new user
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "password": "Password123"
  }
  ```

- **POST /api/auth/signin** - Sign in with credentials
  ```json
  {
    "login": "username or email",
    "password": "Password123"
  }
  ```

- **GET /api/auth/me** - Get current user profile (authenticated)

### Users

- **GET /api/users/:id** - Get user profile by ID (authenticated)

### Health Check

- **GET /api/health** - API health check (no authentication required)

## Authentication

The authentication system uses JWT tokens. To access protected routes:

1. Obtain a token via signup or signin
2. Include the token in the `Authorization` header as `Bearer <token>`


## License

MIT License

