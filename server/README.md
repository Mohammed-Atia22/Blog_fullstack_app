# AuthKit

A simple authentication system with login, signup, Google OAuth, and forgot password. Built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JS.

---

## What it does

- Create an account with your name, email and password
- Log in and get a JWT token
- Sign in with Google
- Forgot your password? Get a reset link sent to your email
- Protected route that returns your account info

---

## Folder structure

```
auth-project/
├── backend/
│   ├── config/
│   │   ├── jwt.config.js      # JWT secret and expiry
│   │   ├── email.js           # Email sending with Nodemailer
│   │   └── passport.js        # Google OAuth setup
│   ├── controllers/
│   │   └── auth.controller.js # All the logic (signup, login, reset, etc.)
│   ├── db/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js # Checks the JWT on protected routes
│   ├── models/
│   │   └── user.model.js      # User schema
│   ├── routes/
│   │   └── auth.routes.js     # Route definitions
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── login.html
    ├── signup.html
    ├── forgot-password.html
    ├── reset-password.html
    ├── dashboard.html
    ├── style.css
    └── auth.js
```

---

## Setup

**1. Install dependencies**
```bash
cd backend
npm install
```

**2. Create your `.env` file**
```bash
cp .env.example .env
```

Then open `.env` and fill these in:

```env
PORT=5000
CLIENT_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/authkit

JWT_SECRET=any_long_random_string
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="AuthKit <your_gmail@gmail.com>"
```

**3. Run it**
```bash
npm run dev
```

**4. Open your browser**
```
http://localhost:5000
```

---

## API routes

| Method | Route | Auth needed | What it does |
|--------|-------|-------------|--------------|
| POST | `/api/auth/signup` | No | Create an account |
| POST | `/api/auth/login` | No | Login and get a token |
| POST | `/api/auth/forgot-password` | No | Send a reset link by email |
| POST | `/api/auth/reset-password` | No | Set a new password using the token |
| GET | `/api/auth/google` | No | Start Google login |
| GET | `/api/auth/google/callback` | No | Google redirects here after login |
| GET | `/api/auth/me` | Yes (JWT) | Get your account info |

For protected routes, send the token in the header:
```
Authorization: Bearer your_token_here
```

---

## Google OAuth setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → **APIs & Services** → **Credentials** → **Create OAuth client ID**
3. Type: **Web application**
4. Add `http://localhost:5000` to authorized origins
5. Add `http://localhost:5000/api/auth/google/callback` to authorized redirect URIs
6. Copy the client ID and secret into your `.env`
7. Go to **OAuth consent screen** → add your Gmail as a test user

---

## Gmail setup for password reset emails

1. Turn on 2-step verification on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use that 16-character password as `EMAIL_PASS` in your `.env`

> Your real Gmail password won't work here — you need the app password.

---

## Tech used

- **Backend** — Node.js, Express, MongoDB, Mongoose
- **Auth** — JWT, Passport.js, bcrypt
- **Email** — Nodemailer
- **Frontend** — HTML, CSS, JavaScript