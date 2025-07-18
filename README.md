# Davon Library Management System

A full-stack library management system with a Java Spring Boot backend and Next.js frontend.

## Project Structure

```
davon-library-system/
├── davon-library-backend/          # Java Quarkus API (Maven)
├── davon-library-webui/            # Next.js Frontend (npm)
├── davon-library-landing-page/     # Static landing page
└── README.md
```

## Technologies

### Backend (Java + Maven)

- **Java 17+** - Programming language
- **Spring Boot 3.2.0** - Backend framework
- **Maven 3.9.5** - Build tool and dependency management
- **Spring Data JPA** - Database abstraction
- **Spring Security** - Authentication and authorization
- **H2 Database** - In-memory database for development
- **PostgreSQL** - Production database support
- **JWT** - Token-based authentication

### Frontend (Next.js + npm)

- **Next.js 14** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- **Java 17 or higher**
- **Node.js 18 or higher**
- **Maven 3.8.0 or higher** (or use included Maven wrapper)

### Backend Setup

```bash
# Navigate to backend directory
cd davon-library-backend

# Using Maven wrapper (recommended)
./mvnw clean compile
./mvnw test
./mvnw spring-boot:run

# Or using system Maven
mvn clean compile
mvn test
mvn spring-boot:run
```

The backend API will be available at: `http://localhost:8080/api`

### Frontend Setup

```bash
# Navigate to frontend directory
cd davon-library-webui

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### Development Workflow

1. **Start Backend**: `cd davon-library-backend && ./mvnw spring-boot:run`
2. **Start Frontend**: `cd davon-library-webui && npm run dev`
3. **Access Application**: Open `http://localhost:3000` in your browser

## Maven Configuration

### Key Maven Features

- **Maven Wrapper** - Included for consistent Maven version across developers
- **Spring Boot Parent** - Provides dependency management and plugin configuration
- **Multi-profile Support** - Development (H2) and production (PostgreSQL) profiles
- **JWT Authentication** - Ready-to-use JWT token support
- **Hot Reload** - Spring Boot DevTools for development

### Maven Commands

```bash
# Build and test
./mvnw clean compile test

# Run application
./mvnw spring-boot:run

# Package for deployment
./mvnw package

# Show dependency tree
./mvnw dependency:tree

# Check for updates
./mvnw versions:display-dependency-updates
```

### Database Configuration

- **Development**: H2 in-memory database

  - Console: `http://localhost:8080/api/h2-console`
  - JDBC URL: `jdbc:h2:mem:library`
  - Username: `sa`
  - Password: `password`

- **Production**: PostgreSQL (configure in `application.yml`)

## API Documentation

Once running, the API endpoints will be available at:

- Base URL: `http://localhost:8080/api`
- Health Check: `http://localhost:8080/api/actuator/health`

## Contributing

1. **Backend changes**: Work in `davon-library-backend/` with Maven
2. **Frontend changes**: Work in `davon-library-webui/` with npm
3. **Run tests**: Use `./mvnw test` for backend, `npm test` for frontend

## License

This project is licensed under the MIT License.
