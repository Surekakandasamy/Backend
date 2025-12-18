# Mobile App Backend API

A Node.js/Express backend for a mobile recharge application with wallet functionality.

## Features

- User authentication (JWT)
- Wallet management
- Mobile recharge plans
- Transaction history
- Payment processing
- Notifications
- Admin dashboard
- Auto-recharge functionality

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mobapp
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Wallet
- GET `/api/wallet/balance` - Get wallet balance
- POST `/api/wallet/topup` - Top up wallet

### Plans
- GET `/api/plans` - Get all plans
- GET `/api/plans/:id` - Get plan by ID

### Recharge
- POST `/api/recharge` - Process recharge

### Transactions
- GET `/api/transactions` - Get transaction history
- GET `/api/transactions/:id` - Get transaction by ID

### Admin
- GET `/api/admin/dashboard` - Admin dashboard stats

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── models/         # Database models
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── server.js           # Entry point
├── .env               # Environment variables
└── package.json       # Dependencies
```