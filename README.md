# Fullstack Demo Task Manager

A modern full-stack task management application designed to demonstrate clean architecture, separation of concerns, and scalable design patterns.

---

## Architecture Overview

This project follows a layered architecture:


[ Next.js Frontend ]
↓
[ FastAPI API Layer (Controllers) ]
↓
[ Service Layer (Business Logic) ]
↓
[ Repository Layer (Data Access) ]
↓
[ Database (SQLite) ]


### Backend Structure


backend/app/
├── api/ # Route handlers (controllers)
├── services/ # Business logic
├── repositories/ # Data access layer
├── models/ # SQLAlchemy ORM models
├── schemas/ # Pydantic DTOs
├── db/ # Database setup
└── core/ # Config, security (future)


---

## Tech Stack

### Backend
- :contentReference[oaicite:0]{index=0}
- SQLAlchemy (ORM)
- Pydantic (validation & DTOs)

### Frontend
- :contentReference[oaicite:1]{index=1} (App Router)
- TypeScript
- Axios (API client)

---

## Design Patterns Used

### 1. Repository Pattern
Encapsulates all database operations and isolates persistence logic.

### 2. Service Layer
Contains business logic and orchestrates repository usage.

### 3. Dependency Injection
Implemented using FastAPI's `Depends` system for loose coupling.

### 4. DTO Pattern (Schemas)
Separates internal database models from external API contracts.

---

## Key Design Decisions

### Why FastAPI?
- High performance
- Native dependency injection
- Strong typing with Pydantic

### Why Next.js?
- Hybrid rendering support
- Clean project structure
- Strong ecosystem

### Why SQLite (initially)?
- Fast setup for development
- No external dependencies

---

## Tradeoffs

| Decision        | Tradeoff |
|----------------|---------|
| SQLite         | Not production-scalable |
| No auth (Day 1)| Simplicity over completeness |
| Minimal UI     | Focus on architecture |

---

## Features (Planned)

- User authentication (JWT)
- Task CRUD operations
- Task filtering (completed / active)
- Responsive UI

---

## How to Run

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload