# Secure Document Link Generator - Backend

A NestJS backend service that generates cryptographically secure, one-time-use document links. Built with TypeScript, Bun runtime, and in-memory SQLite.

## Features

- **Secure Link Generation**: Creates cryptographically strong tokens using 32 random bytes
- **One-Time Use**: Links are automatically invalidated after first access
- **In-Memory Storage**: Uses Bun's SQLite for fast, in-memory data persistence
- **RESTful API**: Clean, well-documented API endpoints
- **Input Validation**: Automatic request validation with class-validator
- **CORS Enabled**: Configured for frontend integration

## Tech Stack

- **Runtime**: Bun (can also run with Node.js)
- **Framework**: NestJS 10.x
- **Database**: Bun SQLite (in-memory)
- **Language**: TypeScript
- **Validation**: class-validator, class-transformer

## Prerequisites

- Bun >= 1.0.0 (preferred) or Node.js >= 18.x
- npm or bun package manager

## Installation

```bash
# Install dependencies with npm
npm install

# Or with Bun (if installed)
bun install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Environment variables:

- `PORT` - Server port (default: 3000)
- `BASE_URL` - Backend URL for link generation (e.g., http://localhost:3000 or your deployed URL)
- `NODE_ENV` - Environment mode (development/production)

## Running the Application

### Development Mode

```bash
# With npm
npm run start:dev

# With Bun
bun run start:dev
```

### Production Mode

```bash
# Build the application
npm run build

# Run in production
npm run start:prod

# Or with Bun
bun run start:prod
```

The application will be available at `http://localhost:3000`

## API Endpoints

### 1. Generate Secure Link

**Endpoint:** `POST /api/generate-link`

**Request Body:**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Success Response (201):**
```json
{
  "link": "http://localhost:3000/api/docs/view/a1b2c3d4e5f6..."
}
```

**Error Response (400):**
```json
{
  "statusCode": 400,
  "message": ["documentName should not be empty"],
  "error": "Bad Request"
}
```

### 2. Redeem Secure Link

**Endpoint:** `GET /api/docs/view/:token`

**Success Response (200):**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Error Response (404):**
```json
{
  "message": "Invalid or expired link.",
  "error": "Not Found",
  "statusCode": 404
}
```

**Note:** Each link can only be redeemed once. Subsequent requests will return 404.

## Testing the API

### Using curl

```bash
# Generate a link
curl -X POST http://localhost:3000/api/generate-link \
  -H "Content-Type: application/json" \
  -d '{"documentName": "test-document.pdf"}'

# Copy the token from the response and redeem it
curl http://localhost:3000/api/docs/view/<TOKEN>

# Try to redeem again (should fail with 404)
curl http://localhost:3000/api/docs/view/<TOKEN>
```

### Using httpie

```bash
# Generate a link
http POST http://localhost:3000/api/generate-link documentName="test-document.pdf"

# Redeem the link
http GET http://localhost:3000/api/docs/view/<TOKEN>
```

## Project Structure

```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── database/                  # Database layer
│   │   ├── database.service.ts    # SQLite initialization
│   │   └── database.module.ts     # Database module
│   └── links/                     # Links feature module
│       ├── links.module.ts        # Module definition
│       ├── links.controller.ts    # API endpoints
│       ├── links.service.ts       # Business logic
│       ├── links.repository.ts    # Database operations
│       ├── dto/                   # Data Transfer Objects
│       │   ├── generate-link.dto.ts
│       │   └── link-response.dto.ts
│       └── entities/
│           └── link.entity.ts     # Link interface
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Database Schema

The in-memory SQLite database uses the following schema:

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

## Deployment

### Railway (Recommended)

1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `PORT`: Will be provided by Railway
   - `BASE_URL`: Your Railway app URL (e.g., https://your-app.railway.app)
   - `NODE_ENV`: production
3. Build command: `npm install && npm run build`
4. Start command: `npm run start:prod`

### Alternative Platforms

- **Render**: Similar setup, use Web Service
- **Fly.io**: Use `fly launch` and configure Dockerfile
- **DigitalOcean App Platform**: Connect repo and set build/run commands

### Important Note

Since the database is in-memory (`:memory:`), all data will be lost when the server restarts. This is expected behavior for this implementation.

## Security Features

- **Cryptographic Tokens**: Uses Node.js `crypto.randomBytes(32)` for secure token generation
- **SQL Injection Prevention**: All queries use prepared statements
- **Input Validation**: Automatic validation using class-validator decorators
- **CORS**: Configured to accept requests from the frontend

## What I'm Proud Of

- Clean, layered architecture (Controller → Service → Repository → Database)
- Proper separation of concerns with NestJS modules
- Type-safe implementation throughout
- Cryptographically secure token generation
- Simple but effective one-time use enforcement
- Ready for production deployment

## Assumptions

- Tokens do not expire by time (only by redemption)
- No authentication/authorization required
- In-memory storage is acceptable (data loss on restart is expected)
- Frontend will be deployed separately and will consume this API

## Future Enhancements (Not Implemented)

- Token expiration (e.g., 15-minute TTL)
- Rate limiting for link generation
- Persistent database (PostgreSQL, MySQL)
- Link analytics and usage tracking
- User authentication
- Comprehensive test coverage

## Deployed URLs

- **Backend URL**: [To be added after deployment]
- **Frontend URL**: [To be added after deployment]

## License

MIT

## Author

Built as part of a take-home technical assessment.
