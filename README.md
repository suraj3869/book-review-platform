# MERN Book Review Platform

## Setup

### Backend
- `cd backend`
- Create `.env` (see example) with your MongoDB Atlas URI and JWT secret
- `npm install`
- `npm start`

### Frontend
- `cd frontend`
- `npm install`
- `npm start`

### API
- `/api/users/signup` – Register
- `/api/users/login` – Login (returns JWT)
- `/api/books` – List/Create (paginated)
- `/api/books/:id` – Book details
- `/api/reviews` – Add review

## Features
- JWT authentication and password hashing (bcrypt)
- Book CRUD (only owner can edit/delete)
- Review CRUD (only owner can edit/delete)
- Pagination (5 books per page)
- Average ratings
- React frontend: Signup, Login, Book List, Book Details, Add/Edit Book, Profile
