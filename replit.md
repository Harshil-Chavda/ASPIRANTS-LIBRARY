# Aspirants Library - Student Management System

## Overview

Aspirants Library is a comprehensive student management system for a study facility that provides library services and study spaces. The application combines a traditional HTML/CSS/JavaScript frontend for public-facing pages with a modern React-based architecture for user dashboards and administrative functions. The system manages student registrations, facility access, and provides both student and admin interfaces for library operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a hybrid frontend approach:
- **Static HTML Pages**: Landing page, registration forms, and marketing content using vanilla HTML/CSS/JavaScript
- **React Components**: Interactive dashboards and user interfaces built with React 19 and TypeScript
- **Styling**: Combination of custom CSS with CSS variables and Tailwind CSS for component styling
- **State Management**: React hooks for local state, with TanStack Query for server state management
- **Routing**: Wouter library for client-side routing in React components
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Authentication**: JWT (JSON Web Tokens) for session management with bcryptjs for password hashing
- **Database**: Drizzle ORM for database operations (database provider not yet specified)
- **API Design**: RESTful endpoints with CORS support for cross-origin requests
- **Type Safety**: Zod schemas for request/response validation and Drizzle-Zod integration

### Data Storage Solutions
- **ORM**: Drizzle ORM chosen for type-safe database operations
- **Schema Validation**: Drizzle-Zod integration for automatic schema validation
- **Database Provider**: Not yet specified (flexible architecture allows for PostgreSQL, MySQL, or SQLite)

### Authentication and Authorization
- **Authentication Method**: JWT-based authentication system
- **Password Security**: bcryptjs for secure password hashing
- **Session Management**: Token-based sessions stored client-side
- **User Roles**: Separate interfaces for students and administrators

## External Dependencies

### Core Runtime Dependencies
- **React Ecosystem**: React 19, React DOM, React Hook Form for modern component architecture
- **TypeScript**: Full TypeScript support for type safety across the application
- **Database**: Drizzle ORM with Zod integration for type-safe database operations
- **Authentication**: jsonwebtoken and bcryptjs for secure user authentication
- **Backend**: Express.js with CORS middleware for API development

### UI and Styling
- **Icons**: Font Awesome 6.0 for consistent iconography
- **Fonts**: Google Fonts (Inter) for modern typography
- **CSS Framework**: Tailwind CSS 4.1 with custom utility classes
- **Component Styling**: Class Variance Authority (CVA) for component variants
- **Utility Libraries**: clsx and tailwind-merge for conditional styling

### Development Tools
- **Build Tool**: Vite 7.1 for fast development and building
- **TypeScript Compiler**: tsx for TypeScript execution
- **CSS Processing**: PostCSS with Autoprefixer for browser compatibility
- **React Tooling**: Vite React plugin for hot module replacement

### Data Fetching and Validation
- **Server State**: TanStack React Query for efficient data fetching and caching
- **Schema Validation**: Zod for runtime type checking and validation
- **Form Validation**: Hookform/resolvers for form validation integration

The architecture is designed to be scalable and maintainable, with clear separation between public marketing pages and authenticated user interfaces. The type-safe approach throughout the stack ensures reliability and developer experience.