# ShopHub - React E-commerce Application

A modern, full-stack e-commerce web application built with React, Redux, and Node.js.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start full stack (frontend + backend)
npm run dev:full
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel Deployment (Frontend)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables:
     ```
     VITE_API_URL=https://your-backend-url.com
     ```
   - Click "Deploy"

3. **Environment Variables**
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-app.railway.app`)

### Backend Deployment Options

#### Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub account
3. Create new project from GitHub repo
4. Select your backend folder
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
6. Deploy

#### Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

## 📁 Project Structure

```
react-ecommerce/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── store/         # Redux store and slices
│   └── router.jsx     # Application routing
├── backend/           # Node.js/Express server
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router DOM
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## 🔧 Configuration

### Environment Variables

Create `.env` files for different environments:

**Development** (`.env.development`):
```
VITE_API_URL=http://localhost:5000
```

**Production** (`.env.production`):
```
VITE_API_URL=https://your-backend-url.com
```

### Vercel Configuration

The `vercel.json` file includes:
- Build configuration for Vite
- SPA routing support
- Asset caching headers
- Output directory configuration

## 🚀 Features

- ✅ User authentication (login/logout)
- ✅ Product browsing and search
- ✅ Shopping cart functionality
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

- JWT-based authentication
- Protected routes
- Input validation
- Secure API endpoints

## 🎨 Design System

- Indigo and purple gradient theme
- Clean, modern typography
- Consistent component styling
- Smooth animations and transitions

## 📞 Support

For deployment issues or questions, check:
1. Vercel documentation
2. Environment variables configuration
3. Backend deployment status
4. API connectivity

---

**Happy Shopping! 🛒**
