import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
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
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
    updateProfile: (userData) => api.put('/auth/profile', userData),
    logout: () => api.post('/auth/logout'),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

// Products API
export const productsAPI = {
    getProducts: (params = {}) => api.get('/products', { params }),
    getProductById: (id) => api.get(`/products/${id}`),
    getFeaturedProducts: () => api.get('/products/featured'),
    getTopProducts: () => api.get('/products/top'),
    getAdminProducts: () => api.get('/products/admin/all'),
    createProduct: (productData) => api.post('/products', productData),
    updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
    deleteProduct: (id) => api.delete(`/products/${id}`),
    addReview: (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData),
};

// Orders API
export const ordersAPI = {
    createOrder: (orderData) => api.post('/orders', orderData),
    getMyOrders: () => api.get('/orders/myorders'),
    getOrderById: (id) => api.get(`/orders/${id}`),
    updateOrderToPaid: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult),
    updateOrderToDelivered: (id) => api.put(`/orders/${id}/deliver`),
    updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
    cancelOrder: (id, reason) => api.put(`/orders/${id}/cancel`, { cancellationReason: reason }),
    getAllOrders: (params = {}) => api.get('/orders', { params }),
};

// Users API
export const usersAPI = {
    getAllUsers: (params = {}) => api.get('/users', { params }),
    getUserById: (id) => api.get(`/users/${id}`),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
    getAddresses: () => api.get('/users/addresses'),
    addAddress: (addressData) => api.post('/users/addresses', addressData),
    updateAddress: (id, addressData) => api.put(`/users/addresses/${id}`, addressData),
    deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
};

// Health check
export const healthCheck = () => api.get('/health');

// Legacy functions for backward compatibility (using mock data as fallback)
const mockProducts = [
    {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        originalPrice: 129.99,
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        category: 'electronics',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        stock: 50,
        rating: 4.5,
        numReviews: 128,
        brand: 'AudioTech',
        features: ['Noise Cancellation', '30h Battery', 'Quick Charge', 'Bluetooth 5.0'],
        discountPercentage: 23,
        isFeatured: true
    },
    {
        id: '2',
        name: 'Smart Fitness Watch',
        price: 199.99,
        originalPrice: 249.99,
        description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
        category: 'electronics',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
        stock: 30,
        rating: 4.3,
        numReviews: 89,
        brand: 'FitTech',
        features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
        discountPercentage: 20,
        isFeatured: true
    },
    {
        id: '3',
        name: 'Premium Coffee Maker',
        price: 149.99,
        originalPrice: 149.99,
        description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
        category: 'home',
        images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
        stock: 25,
        rating: 4.7,
        numReviews: 156,
        brand: 'BrewMaster',
        features: ['Built-in Grinder', 'Thermal Carafe', 'Programmable', 'Auto Shut-off'],
        discountPercentage: 0,
        isFeatured: false
    },
    {
        id: '4',
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        originalPrice: 39.99,
        description: 'Comfortable organic cotton t-shirt available in multiple colors and sizes.',
        category: 'clothing',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
        stock: 100,
        rating: 4.2,
        numReviews: 67,
        brand: 'EcoWear',
        features: ['100% Organic Cotton', 'Multiple Colors', 'Sizes XS-XXL', 'Machine Washable'],
        discountPercentage: 25,
        isFeatured: false
    },
    {
        id: '5',
        name: 'Wireless Gaming Mouse',
        price: 79.99,
        originalPrice: 99.99,
        description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
        category: 'electronics',
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
        stock: 45,
        rating: 4.6,
        numReviews: 203,
        brand: 'GameTech',
        features: ['25K DPI Sensor', 'RGB Lighting', 'Programmable Buttons', 'Wireless'],
        discountPercentage: 20,
        isFeatured: true
    },
    {
        id: '6',
        name: 'Yoga Mat Premium',
        price: 49.99,
        originalPrice: 69.99,
        description: 'Non-slip yoga mat made from eco-friendly materials with alignment lines.',
        category: 'sports',
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'],
        stock: 75,
        rating: 4.4,
        numReviews: 94,
        brand: 'ZenFit',
        features: ['Non-slip Surface', 'Eco-friendly', 'Alignment Lines', '6mm Thick'],
        discountPercentage: 29,
        isFeatured: false
    }
];

// Fallback functions that use mock data if backend is not available
export const fetchProducts = async (params = {}) => {
    try {
        const response = await productsAPI.getProducts(params);
        return response.data;
    } catch (error) {
        console.warn('Backend not available, using mock data:', error.message);
        // Return the same format as backend for consistency
        return {
            products: mockProducts,
            page: 1,
            pages: 1,
            total: mockProducts.length
        };
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await productsAPI.getProductById(id);
        return response.data;
    } catch (error) {
        console.warn('Backend not available, using mock data:', error.message);
        return mockProducts.find(product => product.id === id) || null;
    }
};

export const fetchFeaturedProducts = async () => {
    try {
        const response = await productsAPI.getFeaturedProducts();
        return response.data;
    } catch (error) {
        console.warn('Backend not available, using mock data:', error.message);
        return mockProducts.filter(product => product.isFeatured);
    }
};

export default api;
