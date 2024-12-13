# Dopamind Plus

Welcome to the **Dopamind Plus** API repository! This guide provides step-by-step instructions to set up the development environment and start using the API.

---

## Environment Preparation

### 1. Clone the Repository
Clone this repository to your local machine using the following commands:

```bash
git clone https://github.com/DopamindPlus/api-dopamind.git
cd api-dopamind
```

### 2. Install Dependencies
Make sure **Node.js** and **npm** are installed on your system. You can download Node.js from the [official website](https://nodejs.org/).

Once installed, run the following command to install project dependencies:

```bash
npm install
```

### 3. Set Up the `.env` File
Locate the `.env.example` file in the project root. Copy it to `.env` and edit it to include your environment-specific values:

```bash
cp .env.example .env
```

Edit the `.env` file to include the following configurations:

```env
DATABASE_URL=your_database_connection_url
PORT=your_server_port
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

- `DATABASE_URL`: The connection URL for your database (e.g., PostgreSQL, MySQL).
- `PORT`: The port on which the server will run (default: `3000`).
- `JWT_SECRET`: A strong secret key for signing JSON Web Tokens.
- `JWT_EXPIRES_IN`: Token expiration time (e.g., `1h` for 1 hour).

---

## Running the Application

Start the application by running the following command:

```bash
npm run start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

---

## Testing the API

Once the server is running, you can test the API endpoints using tools like [Postman](https://www.postman.com/) or `curl`. Ensure you include the JWT token in the `Authorization` header for endpoints requiring authentication.

---

## Troubleshooting

If you encounter any issues during setup or while running the application:

1. Double-check your `.env` configuration.
2. Ensure your database is running and accessible.
3. Review the application logs for detailed error messages.

---

If further assistance is needed, feel free to open an issue in this repository or contact the development team!
