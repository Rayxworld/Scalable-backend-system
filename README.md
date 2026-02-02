# Scalable Multi-Language Backend System

This repository contains a modular backend system implemented with three different technology stacks, all using SQLite for local storage.

## Services

### 1. User Service (Node.js / TypeScript)
- **Port:** 3001
- **Stack:** Express, TypeORM, Zod
- **Responsible for:** User management and roles.

### 2. Product Service (Java / Spring Boot)
- **Port:** 3002
- **Stack:** Spring Boot, Spring Data JPA, Jakarta Validation
- **Responsible for:** Product catalog management.

### 3. Analytics Service (Python / FastAPI)
- **Port:** 8000
- **Stack:** FastAPI, SQLAlchemy
- **Responsible for:** Data aggregation and event tracking.

---

## How to Run

### Prerequisite: Ensure SQLite is installed (built-in on most OS).

### Start User Service
```bash
cd user-service
npm install
npm run dev
```

### Start Product Service
```bash
cd product-service
./mvnw spring-boot:run
```

### Start Analytics Service
```bash
cd analytics-service
venv/Scripts/activate (Windows) OR source venv/bin/activate (Unix)
uvicorn main:app --reload
```

## System Architecture
All services follow a **Layered Architecture**:
- **Controller/Web Layer**: Handles REST requests and DTO validation.
- **Service Layer**: Contains core business rules.
- **Data/Repository Layer**: Handles database interactions via ORM.
- **Error Handling**: Standardized error responses across all services.

## REST API Examples

### Create User (Node.js)
`POST http://localhost:3001/users`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Product (Java)
`POST http://localhost:3002/products`
```json
{
  "name": "Gaming Laptop",
  "description": "High-end laptop",
  "price": 1200.00,
  "stockQuantity": 10
}
```

### Track Event (Python)
`POST http://localhost:8000/analytics/log?event_type=USER_LOGIN&description=User johndoe logged in`
