# Twitter Clone App

A full-stack Twitter clone built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Create and delete tweets (280 character limit)
- Like/unlike tweets
- Real-time tweet feed
- User profiles with avatars
- Responsive design

## Tech Stack

**Frontend:**
- React 19
- React Router
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)

### Backend Setup

1. Navigate to backend folder:
```bash
cd twitter-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file (already set up with your MongoDB connection)

4. Start the backend server:
```bash
npm start
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd twitter-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Usage

1. Register a new account
2. Login with your credentials
3. Create tweets from the home page
4. Like tweets by clicking the heart icon
5. Delete your own tweets using the × button

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/tweets` - Create tweet
- `GET /api/tweets` - Get all tweets
- `GET /api/tweets/:id` - Get single tweet
- `DELETE /api/tweets/:id` - Delete tweet
- `POST /api/tweets/like/:id` - Toggle like on tweet
