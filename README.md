# **Strengthtrainer API**

## **Table of Contents**

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
   - [Authentication](#authentication)
   - [Endpoints](#endpoints)
5. [Environment Variables](#environment-variables)
6. [Error Handling](#error-handling)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

## **Introduction**

This API provides access to a comprehensive workout management system. It allows users to create, retrieve, update, and delete workout plans and track their progress over time.

## **Features**

- RESTful architecture
- JWT-based authentication
- CRUD operations for managing resources
- Error handling and validation

## **Getting Started**

### **Prerequisites**

List the software and versions required to run your API.

- Node.js v16+ or higher
- npm v8+
- PostgreSQL

### **Installation**

Provide step-by-step instructions to set up the project locally.

```bash
# Clone the repository
git clone https://github.com/joshgarza/strengthtrainer-server

# Navigate to the project directory
cd strengthtrainer-server/

# Install dependencies
npm install

# Set up environment variables
rename example.env to .env

# Set up the database
# npx sequelize db:migrate

# Start the development server
npm run dev
```

## **Usage**

### **Authentication**

```
This API uses JWT for authentication. When a new user registers or an existing user logs in, a JWT is issued. You must include this JWT token in the `Authorization` header of requests to protected endpoints.

Example:
Authorization: Bearer <your_token_here>
```

### **Endpoints**

Detail the available API endpoints, their methods, and example requests/responses.

#### **User Endpoints**

- **Register a User**

  - `POST /api/register`
  - Description: Register a new user.
  - Example Request:
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - Example Response:
    ```json
    {
      "message": "User registered successfully",
      "token": "<jwt_token>"
    }
    ```

- **Login a User**
  - `POST /api/login`
  - Description: Login and retrieve a JWT token.
  - Example Request:
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - Example Response:
    ```json
    {
      "token": "<jwt_token>"
    }
    ```

#### **Workout Endpoints**

- **Get a Workout**

  - `GET /api/workouts/:id`
  - Description: Retrieve a specific workout by ID.
  - Example Response:
    ```json
    {
      "id": 1,
      "name": "Leg Day",
      "exercises": [...]
    }
    ```

- **Create a Workout**
  - `POST /api/workouts`
  - Description: Create a new workout.
  - Example Request:
    ```json
    {
      "name": "Leg Day",
      "exercises": [...]
    }
    ```
  - Example Response:
    ```json
    {
      "id": 1,
      "message": "Workout created successfully"
    }
    ```

Add more endpoints following the same structure as needed.

## **Environment Variables**

List all environment variables required for the project and their descriptions.

```plaintext
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## **Error Handling**

Describe how errors are handled and what the typical error response looks like.

Example:

```json
{
  "error": "Invalid request parameters",
  "message": "The 'name' field is required."
}
```

## **Testing**

Explain how to run the tests for the API.

```bash
# Run unit and integration tests
npm test
# or
yarn test
```

## **Deployment**

Provide instructions for deploying the API to a live environment.

Example:

```bash
# Deploy to Heroku
heroku login
heroku create your-app-name
git push heroku main
heroku run npx sequelize db:migrate
```

## **Contributing**

Explain how others can contribute to the project.

Example:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## **License**

Include the license under which the project is released.

Example:

```
This project is licensed under the MIT License - see the LICENSE file for details.
```

## **Contact**

Provide contact information for anyone needing further assistance.

Example:

```
If you have any questions, feel free to reach out at [your-email@example.com](mailto:your-email@example.com).
```

```
This README template provides a comprehensive structure for documenting your API. Customize it to fit the specifics of your project.
```

```

Feel free to copy and paste this template into your README file, and modify the content to suit your project's needs.
```
