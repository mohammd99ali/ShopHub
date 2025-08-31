# 🛍️ Modern E-commerce Application

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features a modern, responsive frontend with a robust backend API.

## ✨ Features

### Frontend (React)

- **Modern UI/UX** with Tailwind CSS v4
- **Responsive Design** for all devices
- **State Management** with Redux Toolkit
- **Client-side Routing** with React Router
- **Real-time Search** and filtering
- **Shopping Cart** functionality
- **User Authentication** and profiles
- **Product Reviews** and ratings
- **Order Management** and tracking

### Backend (Node.js/Express)

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with bcrypt password hashing
- **Role-based Access Control** (User/Admin)
- **File Upload** support with Multer
- **Rate Limiting** and security headers
- **Comprehensive Error Handling**
- **API Documentation** included

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-ecommerce
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**

   ```bash
   # Copy backend environment file
   cp backend/env.example backend/.env

   # Edit backend/.env with your configuration
   # Set your MongoDB URI and JWT secret
   ```

5. **Start MongoDB**

   ```bash
   # Local MongoDB
   mongod

   # Or use MongoDB Atlas (cloud)
   ```

6. **Run the application**

   ```bash
   # Start both frontend and backend
   npm run dev:full

   # Or start them separately:
   # Frontend only: npm run dev
   # Backend only: cd backend && npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5175
   - Backend API: http://localhost:5000/api
   - API Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
react-ecommerce/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── store/             # Redux store and slices
│   ├── services/          # API services
│   ├── assets/            # Static assets
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── backend/               # Backend source code
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── public/                # Public assets
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## 🔧 Configuration

### Frontend Configuration

- **Vite**: Build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **Redux Toolkit**: State management
- **React Router v6**: Client-side routing

### Backend Configuration

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **Multer**: File uploads
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products

- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add user address

## 🎨 Frontend Features

### Components

- **Navbar**: Navigation with user menu and cart
- **ProductCard**: Product display with hover effects
- **ProductGrid**: Responsive product grid
- **Cart**: Shopping cart with quantity controls
- **Loader**: Loading spinner component
- **QuantityControl**: Product quantity selector

### Pages

- **Home**: Hero section with featured products
- **ProductDetails**: Detailed product view with reviews
- **Cart**: Shopping cart management
- **Checkout**: Order completion
- **Login**: User authentication
- **Profile**: User profile management
- **NotFound**: 404 error page

### Styling

- **Modern Design**: Glassmorphism effects and gradients
- **Responsive**: Mobile-first approach
- **Animations**: Smooth hover effects and transitions
- **Dark Mode Ready**: CSS variables for theming

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Configured for frontend access
- **Input Validation**: Request validation
- **Error Handling**: Centralized error management

## 🚀 Deployment

### Frontend Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment

```bash
cd backend
npm start
# Deploy to your server or cloud platform
```

### Environment Variables

Create `.env` file in the backend directory:

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
