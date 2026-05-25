# Study Planner and Task Manager

Beginner-friendly React study planner with an Express and MongoDB backend.

## Project folders

- `client`: React app built with Vite and Tailwind CSS.
- `server`: Express API with routes, controllers, middleware, Mongoose models, bcrypt password hashing, and JWT auth.

## Run the frontend

```bash
cd client
npm install
npm run dev
```

On PowerShell, use `npm.cmd run dev` if `npm` is blocked by the execution policy.

## Run the backend

```bash
cd server
npm install
npm run dev
```

On PowerShell, use `npm.cmd run dev` if `npm` is blocked by the execution policy.

The backend uses the `PORT` value in `server/.env`. With the current setup it runs at `http://localhost:5002`.

When the backend starts correctly, the terminal shows:

```bash
Starting backend...
MongoDB connected successfully
Database host: your-mongodb-host
Server running on port 5002
Backend URL: http://localhost:5002
```

## Backend routes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/categories`
- `POST /api/categories`
- `DELETE /api/categories/:id`

Add your MongoDB connection string in `server/.env`:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_secret_text
```
