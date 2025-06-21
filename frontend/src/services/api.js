// Use a relative path for production and a full URL for development.
// This allows the Vercel rewrites to work correctly in production.
const API_BASE_URL = import.meta.env.PROD 
    ? '/api/v1' 
    : 'http://localhost:3000/api/v1';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Course API calls
export const courseAPI = {
    // Get all courses (using the preview endpoint for now)
    getAllCourses: () => apiCall('/course/preview', { method: 'POST' }),
    
    // Get purchased courses
    getPurchasedCourses: () => apiCall('/course/purchases'),
    
    // Get user purchases
    getUserPurchases: () => apiCall('/user/purchases'),
};

// User API calls
export const userAPI = {
    // Sign up
    signup: (userData) => apiCall('/user/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    
    // Sign in
    signin: (credentials) => apiCall('/user/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
};

// Cart API calls (for future implementation)
export const cartAPI = {
    // For now, we'll use localStorage for cart management
    // These can be connected to backend endpoints when they're available
    
    getCart: () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },
    
    addToCart: (item) => {
        const cart = cartAPI.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },
    
    updateCartItem: (itemId, quantity) => {
        const cart = cartAPI.getCart();
        const item = cart.find(cartItem => cartItem.id === itemId);
        
        if (item) {
            if (quantity <= 0) {
                cartAPI.removeFromCart(itemId);
            } else {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
        
        return cart;
    },
    
    removeFromCart: (itemId) => {
        const cart = cartAPI.getCart();
        const updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
    },
    
    clearCart: () => {
        localStorage.removeItem('cart');
        return [];
    },
}; 