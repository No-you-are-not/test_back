# Secure Document Link Generator - Backend

A NestJS API that generates cryptographically secure, one-time-use document links. Built with Bun, TypeScript, and in-memory SQLite.

## Live Demo

- **Backend**: https://testback-production-3143.up.railway.app
- **Frontend**: https://test-front-rust.vercel.app

## Tech Stack

- **Runtime**: Bun
- **Framework**: NestJS 11.x
- **Database**: Bun SQLite (in-memory)
- **Language**: TypeScript

## Quick Start

### Installation

```bash
bun install
```

### Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set environment variables:
- `PORT` - Server port (default: 3000)
- `BASE_URL` - Your backend URL (e.g., `https://testback-production-3143.up.railway.app`)
- `NODE_ENV` - development/production

### Run

**Development:**
```bash
bun run start:dev
```

**Production:**
```bash
bun run start:prod
```

Server runs at `http://localhost:3000`

## API Endpoints

### Generate Link

```
POST /api/generate-link
```

**Request:**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Response:**
```json
{
  "link": "https://testback-production-3143.up.railway.app/api/docs/view/abc123..."
}
```

### Redeem Link (One-Time Use)

```
GET /api/docs/view/:token
```

**Success:**
```json
{
  "documentName": "2024-Q3-Statement.pdf"
}
```

**Error (404):**
```json
{
  "message": "Invalid or expired link."
}
```

## Testing

```bash
# Generate a link
curl -X POST http://localhost:3000/api/generate-link \
  -H "Content-Type: application/json" \
  -d '{"documentName": "test.pdf"}'

# Redeem the link
curl http://localhost:3000/api/docs/view/<TOKEN>
```

## Deployment

Deployed on Railway. Environment variables:
- `PORT` - Auto-provided
- `BASE_URL` - Your Railway URL
- `NODE_ENV` - production

## Notes

- Database is in-memory - data resets on restart
- Links are one-time use only
- Tokens are cryptographically secure (32 random bytes)
- Used Claude Code for scaffolding NestJS boilerplate and routes
