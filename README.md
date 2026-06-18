# 🚀 PROMPTENGINE

A full-stack MERN application for managing, testing, and sharing AI prompts with an integrated marketplace and analytics dashboard.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Seeding Data](#-seeding-data)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **User Authentication**: Secure signup/login with JWT-based authentication
- **Prompt Management**: Create, edit, delete, and organize AI prompts
- **AI Integration**: Test prompts with OpenRouter API integration
- **Marketplace**: Browse and share prompt packs with the community
- **Analytics Dashboard**: Track prompt performance and usage statistics
- **Modern UI**: Beautiful, responsive interface built with React and shadcn/ui
- **Dark Mode**: Full dark mode support with next-themes
- **Form Validation**: Robust form handling with React Hook Form and Zod

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library (Radix UI)
- **Lucide React** - Icon library
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Express Validator** - Request validation
- **Morgan** - HTTP request logger

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (v5.0 or higher) - Running locally or MongoDB Atlas account
- **OpenRouter API Key** (for AI features)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/PROMPTENGINE.git
cd PROMPTENGINE
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Server Configuration

1. Navigate to the `server` directory
2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/prompt-engine
JWT_SECRET=your_jwt_secret_key_here_change_in_production
OPENROUTER_API_KEY=your_openrouter_api_key_here
APP_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

**Important:**
- Replace `JWT_SECRET` with a strong, random string
- Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/)
- Update `MONGODB_URI` if using MongoDB Atlas or a different connection string

### Client Configuration

The client is configured to connect to `http://localhost:4000` by default. If you change the server port, update the API base URL in the client configuration.

## 🚀 Running the Application

### Development Mode

You need to run both the server and client in separate terminal windows.

#### Terminal 1 - Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:4000`

#### Terminal 2 - Start the Frontend Client

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### Production Build

#### Build the client

```bash
cd client
npm run build
```

#### Start the server

```bash
cd server
npm start
```

## 📁 Project Structure

```
PROMPTENGINE/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreatePrompt.jsx
│   │   │   ├── PromptView.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/      # API service functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Express application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   └── routes/       # API routes
│   ├── packs/            # Marketplace seed data
│   ├── seed.js           # Database seeding script
│   ├── seedMarketplace.js # Marketplace seeding script
│   ├── server.js         # Entry point
│   ├── .env.example      # Environment variables template
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /v1/auth/signup` - Register a new user
- `POST /v1/auth/login` - Login user
- `GET /v1/auth/me` - Get current user (protected)

### Prompts
- `GET /v1/prompts` - Get all user prompts (protected)
- `POST /v1/prompts` - Create a new prompt (protected)
- `GET /v1/prompts/:id` - Get a specific prompt (protected)
- `PUT /v1/prompts/:id` - Update a prompt (protected)
- `DELETE /v1/prompts/:id` - Delete a prompt (protected)

### AI Features
- `POST /v1/ai/test` - Test a prompt with AI (protected)
- `POST /v1/ai/generate` - Generate content with AI (protected)

### Marketplace
- `GET /v1/packs` - Get all prompt packs
- `GET /v1/packs/:id` - Get a specific pack
- `POST /v1/packs` - Create a new pack (protected)

### Health Check
- `GET /v1/health` - Server health check

## 🌱 Seeding Data

To populate your database with sample data:

### Seed basic prompts

```bash
cd server
npm run seed
```

### Seed marketplace packs

```bash
cd server
npm run seed:marketplace
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [OpenRouter](https://openrouter.ai/) for AI API integration
- [Lucide](https://lucide.dev/) for the icon set

---

**Made with ❤️ by the PROMPTENGINE team**