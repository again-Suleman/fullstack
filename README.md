# Store Management System

This project is a Store Management System built using React for the frontend and Express with Node.js for the backend. It allows users to manage stores by adding, viewing, and deleting store information.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add Store:** Users can add new stores with details including name, description, and logo.
- **View Stores:** Users can view a list of all stores.
- **Delete Store:** Users can delete a store after confirming the action.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MySQL database server.

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/store-management-system.git
    cd store-management-system/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the database:

    - Create a MySQL database.
    - Update the `config/db.js` file with your database credentials.

4. Run database migrations (if any):

    ```bash
    # Example command
    npx sequelize-cli db:migrate
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `client` directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the interface to add, view, and delete stores.

## API Endpoints

### Store Endpoints

- `GET /api/store/` - Get all stores.
- `POST /api/store/add` - Add a new store.
  - Request body: `{ stName: string, description: string, logo: File }`
- `DELETE /api/store/delete` - Delete a store.
  - Request body: `{ stName: string }`

### Authentication Endpoints

- Add authentication-related endpoints if you have any.

## Project Structure

