import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    logout: () => api.post('/api/auth/logout'),
    getProfile: () => api.get('/api/auth/profile'),
};

// Products API
export const productsAPI = {
    getProducts: () => api.get('/api/products'),
    getProduct: (id) => api.get(`/api/products/${id}`),
    getAdminProducts: () => api.get('/api/products/admin/all'),
    createProduct: (productData) => api.post('/api/products', productData),
    updateProduct: (id, productData) => api.put(`/api/products/${id}`, productData),
    deleteProduct: (id) => api.delete(`/api/products/${id}`),
};

// Orders API
export const ordersAPI = {
    createOrder: (orderData) => api.post('/api/orders', orderData),
    getOrders: () => api.get('/api/orders'),
    getOrder: (id) => api.get(`/api/orders/${id}`),
};

// Users API
export const usersAPI = {
    getUsers: () => api.get('/api/users'),
    getUser: (id) => api.get(`/api/users/${id}`),
    updateUser: (id, userData) => api.put(`/api/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/api/users/${id}`),
};

export default api;
