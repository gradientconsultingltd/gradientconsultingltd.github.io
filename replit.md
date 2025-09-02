# Overview

GradientXchange is a cryptocurrency aggregation platform specifically designed for African markets. The platform serves as a B2B and B2C solution, providing API services that enable businesses to integrate cryptocurrency on-ramp and off-ramp services using familiar African payment methods like bank transfers, mobile money, and cards. Currently in development phase with a "Coming Soon" landing page that includes contact functionality and service previews.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask for server-side rendering
- **UI Framework**: Bootstrap 5.3.2 for responsive design and components
- **Styling**: Custom CSS with CSS variables for theming and African-inspired color scheme
- **JavaScript**: Vanilla JavaScript for widget functionality and interactive elements
- **Design Pattern**: Traditional multi-page application with modular template inheritance

## Backend Architecture
- **Web Framework**: Flask with SQLAlchemy ORM for database operations
- **Database Design**: Simple relational model using SQLAlchemy's DeclarativeBase
- **Form Handling**: Flask-WTF for secure form processing with CSRF protection
- **Session Management**: Flask sessions with configurable secret key
- **Error Handling**: Centralized logging with rollback mechanisms for database operations
- **Deployment**: WSGI-compatible with ProxyFix middleware for reverse proxy deployments

## Data Storage
- **Primary Database**: SQLite for development with PostgreSQL compatibility via environment variables
- **Connection Pooling**: Configured with pool recycling and pre-ping for connection health
- **Schema Management**: Automatic table creation on application startup
- **Data Model**: Single ContactSubmission entity for collecting user inquiries

## Security & Configuration
- **Environment Variables**: Configuration through environment variables for database URL and session secrets
- **Form Validation**: Server-side validation with WTForms validators
- **CSRF Protection**: Built-in Flask-WTF CSRF protection
- **Input Sanitization**: Length limits and data type validation on all form inputs

# External Dependencies

## Frontend Libraries
- **Bootstrap 5.3.2**: CSS framework via CDN for responsive UI components
- **Font Awesome 6.4.0**: Icon library via CDN for visual elements
- **Google Fonts**: Inter font family for typography consistency

## Backend Packages
- **Flask**: Core web framework for routing and request handling
- **Flask-SQLAlchemy**: ORM integration for database operations
- **Flask-WTF**: Form handling and CSRF protection
- **WTForms**: Form validation and rendering
- **Werkzeug**: WSGI utilities including ProxyFix middleware

## Development Environment
- **Python Runtime**: Flask development server with debug mode
- **Database**: SQLite for local development, PostgreSQL-ready for production
- **Logging**: Python standard logging module for application monitoring

## Future Integrations
- **Cryptocurrency APIs**: Planned integration for real-time exchange rates and trading
- **African Payment Gateways**: Mobile money and banking API integrations
- **Authentication System**: User registration and API key management systems