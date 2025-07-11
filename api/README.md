#  Users API

A simple and clean user management API, built with **NestJS**, using **PostgreSQL** for persistence and **Redis** for caching.  
Developed as part of a technical challenge.

---

## How to Run

```bash
# Step 1: Start PostgreSQL and Redis using Docker
cd docker && docker-compose up -d

# Step 2: Go back to the project root
cd ..

# Step 3: Install dependencies
npm install

# Step 4: Run migrations
npm run migration:run

# Step 5: Start the server
npm start

# Step 6: Visit http://localhost:3000/api/docs to access the Swagger documentation
```

## How run tests

```bash
# run tests
npm run test
```

## Example .env
```bash
# Application
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=referer
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_TTL=300

# JWT
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=1d
```

## Endpoints

The API provides the following endpoints:

- `POST /api/v1/auth/login`: Log in with existing user credentials
- `GET /api/v1/users`: Get all users (with optional pagination)
- `GET /api/v1/users/:id`: Get a specific user by ID
- `PUT /api/v1/users/:id`: Update a user by ID
- `DELETE /api/v1/users/:id`: Delete a user by ID

For detailed request and response formats, please refer to the Swagger documentation.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To obtain a token, you need to log in with your credentials. The token should be included in the `Authorization` header of subsequent requests as follows:

```
Authorization: Bearer <your-token>
```

Replace `<your-token>` with the token you receive after logging in.

## Main Features
  - Full CRUD for users
  - JWT Authentication
  - Pagination support
  - redis based cache
  - Global error handling
  - Swagger documentation
  - Structured loggin
  - Payload Validation

## Improviments

The caching layer could be further improved with smarter invalidation strategies
(e.g. auto-invalidate paginated lists on create/update/delete).

## Project Structure (Simplified)
src/
├── modules/
│   └── user/           # Business logic
├── shared/
│   ├── dtos/           # Common DTOs
│   ├── repository/     # Base repositories
│   └── utils/          # Helpers (e.g., hash, auth)
├── config/             # Env, Redis, TypeORM, Swagger configs
└── main.ts             # Application entrypoint