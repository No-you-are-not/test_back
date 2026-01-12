# Secure Document Link Generator - Backend

A NestJS-based API that generates cryptographically secure, one-time-use document links for sensitive files. This was built as part of a take-home technical assessment focusing on API design, security, and deployment.

## Live Demo

- **Deployed Backend**: https://testback-production-3143.up.railway.app
- **Frontend App**: https://test-front-rust.vercel.app

## Overview

I designed this backend to handle secure document sharing using one-time tokens. The main architectural decisions I made were:

- **Modular architecture**: Separated concerns into database, links, and DTOs layers for maintainability
- **In-memory SQLite**: Used Bun's built-in SQLite for fast, ephemeral storage as required
- **Cryptographic security**: Implemented 32-byte random token generation using Node.js crypto
- **Repository pattern**: Created a clean data access layer to keep business logic separate from database operations
- **Input validation**: Integrated class-validator for automatic request validation

I used Claude Code to help scaffold some of the NestJS boilerplate and route implementations, but the overall structure, security approach, and architectural decisions were mine.

## Tech Stack

- **Runtime**: Bun (also compatible with Node.js)
- **Framework**: NestJS 11.x
- **Database**: Bun SQLite (in-memory)
- **Language**: TypeScript
- **Validation**: class-validator & class-transformer

## Features

✅ **Secure Token Generation**: Cryptographically strong 32-byte tokens
✅ **One-Time Use Enforcement**: Links automatically invalidate after redemption
✅ **RESTful API Design**: Clean, intuitive endpoints
✅ **Input Validation**: Automatic validation with descriptive error messages
✅ **CORS Configuration**: Ready for frontend integration
✅ **Production Ready**: Deployed and tested on Railway

## Prerequisites

- **Bun** >= 1.0.0 (recommended) or **Node.js** >= 18.x
- npm or bun package manager

## Quick Start

### 1. Install Dependencies

```bash
bun install
# or
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Environment variables:
- `PORT` - Server port (default: 3000)
- `BASE_URL` - Your backend URL for link generation (e.g., `https://your-app.railway.app`)
- `NODE_ENV` - Environment mode (development/production)

### 3. Run the Application

**Development:**
```bash
bun run start:dev
# or
npm run start:dev
```

**Production:**
```bash
bun run start:prod
# or
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Documentation

### Generate Secure Link

**Endpoint:** `POST /api/generate-link`

Creates a secure, one-time-use link for a document.

**Request:**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Response (201):**
```json
{
  "link": "https://your-backend.railway.app/api/docs/view/a1b2c3d4e5f6..."
}
```

**Error (400):**
```json
{
  "statusCode": 400,
  "message": ["documentName should not be empty"],
  "error": "Bad Request"
}
```

### Redeem Secure Link

**Endpoint:** `GET /api/docs/view/:token`

Retrieves the document name and marks the link as used. Each link can only be redeemed once.

**Response (200):**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Error (404):**
```json
{
  "message": "Invalid or expired link.",
  "error": "Not Found",
  "statusCode": 404
}
```

**Note:** Second attempt to redeem the same token will return 404.

## Testing the API

### Using curl

```bash
# Generate a link
curl -X POST http://localhost:3000/api/generate-link \
  -H "Content-Type: application/json" \
  -d '{"documentName": "test-document.pdf"}'

# Redeem the link (copy token from above response)
curl http://localhost:3000/api/docs/view/<TOKEN>

# Try again (should fail with 404)
curl http://localhost:3000/api/docs/view/<TOKEN>
```

### Using Postman

Import the included `Secure-Document-Links.postman_collection.json` file.

## Project Structure

I organized the code into clear, modular layers:

```
backend/
├── src/
│   ├── main.ts                    # App entry point & CORS config
│   ├── app.module.ts              # Root module
│   ├── database/                  # Database layer
│   │   ├── database.service.ts    # SQLite initialization & schema
│   │   └── database.module.ts     # Database module setup
│   └── links/                     # Links feature module
│       ├── links.module.ts        # Module definition
│       ├── links.controller.ts    # HTTP endpoints
│       ├── links.service.ts       # Business logic & token generation
│       ├── links.repository.ts    # Database operations
│       ├── dto/                   # Request/response DTOs
│       │   ├── generate-link.dto.ts
│       │   └── link-response.dto.ts
│       └── entities/
│           └── link.entity.ts     # TypeScript interface
├── .env                          # Environment configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

### Key Architecture Decisions

1. **Repository Pattern**: I separated database operations into a repository layer to keep the service focused on business logic
2. **DTOs for Validation**: Used class-validator decorators on DTOs for automatic input validation
3. **Service Layer**: All token generation and one-time-use logic lives in the service, not the controller
4. **Prepared Statements**: All database queries use prepared statements to prevent SQL injection

## Database Schema

The in-memory SQLite database uses this schema:

```sql
CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,
  document_name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  redeemed_at INTEGER DEFAULT NULL
);

CREATE INDEX idx_token ON links(token);
```

The index on `token` ensures fast lookups for redemption requests.

## Deployment

### Railway (What I Used)

1. Connect your GitHub repository to Railway
2. Add environment variables:
   - `PORT`: Auto-provided by Railway
   - `BASE_URL`: Your Railway app URL (e.g., `https://your-app.railway.app`)
   - `NODE_ENV`: `production`
3. Railway auto-detects Bun and runs `bun run start:prod`

### Alternative Platforms

- **Render**: Create a Web Service, set build command to `bun install`
- **Fly.io**: Use `fly launch` with Dockerfile
- **DigitalOcean App Platform**: Connect repo and configure start command

### Important Note About In-Memory Storage

Since I used `:memory:` for SQLite (as required), all links reset when the server restarts. This is expected behavior and acceptable for this demo.

## Security Considerations

- **Cryptographic Tokens**: Using `crypto.randomBytes(32)` for secure random generation
- **One-Time Use**: Enforced at the database level with `redeemed_at` timestamp
- **SQL Injection Prevention**: All queries use parameterized statements
- **Input Validation**: Automatic validation prevents invalid requests
- **CORS**: Configured to allow frontend requests

## What I'm Proud Of

- **Clean Architecture**: The layered approach makes the code easy to understand and extend
- **Type Safety**: Leveraged TypeScript throughout for compile-time safety
- **Security First**: Used proper cryptographic functions and input validation
- **Production Ready**: Deployed and fully functional with proper error handling
- **Simplicity**: Kept it focused on requirements without over-engineering

## Design Decisions & Trade-offs

1. **No Token Expiration**: I implemented one-time use but not time-based expiration. This was a conscious choice to keep it simple for the assessment.

2. **In-Memory Database**: Required by the spec. In production, I'd use PostgreSQL or MySQL for persistence.

3. **No Rate Limiting**: For a production system, I'd add rate limiting on the `/api/generate-link` endpoint.

4. **No Authentication**: Per requirements, this is an open API. In real-world scenarios, I'd add auth.

## Future Enhancements (Not Implemented)

If I were to extend this beyond the requirements:
- Time-based token expiration (15-minute TTL)
- Rate limiting for link generation
- Persistent database (PostgreSQL)
- User authentication & authorization
- Audit logging
- Comprehensive test suite

## Development Notes

The backend runs TypeScript directly with Bun, so there's no build step needed for development. For deployment, Bun handles TypeScript transpilation on the fly.

## License

MIT

---

Built by Polina for a take-home technical assessment. Architecture and design decisions by me, with implementation assistance from Claude Code.
