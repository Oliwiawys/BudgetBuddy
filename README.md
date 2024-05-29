# Personal Expense Manager

BudgetBuddy - this web application helps users manage their personal expenses efficiently. The backend is built with Java Spring Boot, and the frontend is developed using React.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features
- **User Authentication:** Secure user login and registration.
- **Expense Tracking:** Add, edit, and delete expenses.
- **Category Management:** Organize expenses by categories.

## Installation

### Prerequisites
- Java 19
- Node.js and npm
- Docker

### Quick Setup Using `startup.bat`
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Oliwiawys/BudgetBuddy
   cd BudgetBuddy

2. Run the startup script:
   ```bash
   startup.bat

This script will:
1. Start the database using Docker Compose.
2. Start the backend using Java.
3. Start the frontend using React.

## Usage
1. Open your browser and go to http://localhost:3000.
2. Register a new account or log in with existing credentials.
Example credentials:
   - admin/admin - admin account
   - user/user - user account
Start managing your expenses by adding new entries and analyzing your spending.

## Technologies Used
- **Backend:** Java Spring Boot
  - Spring Data JPA
  - Spring Web
  - Spring Security
  - Spring Boot DevTools
- **Frontend:** React
- **Database:** MySQL
  - MySQL Connector/J (JDBC driver for MySQL)
  - Hibernate (ORM framework)
- **Authentication:** Spring Security
  - JWT (JSON Web Tokens)
- **Styling:** CSS
