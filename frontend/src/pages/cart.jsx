import { useState, useEffect } from "react";
import { cartAPI } from "../services/api";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        try {
            const items = cartAPI.getCart();
            setCartItems(items);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        try {
            if (newQuantity < 1) return;
            const updatedCart = cartAPI.updateCartItem(id, newQuantity);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity');
        }
    };

    const removeItem = (id) => {
        try {
            const updatedCart = cartAPI.removeFromCart(id);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item');
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleCheckout = () => {
        try {
            // Here you would typically call a backend API to process the order
            alert("Proceeding to checkout...");
            // cartAPI.clearCart(); // Clear cart after successful checkout
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Checkout failed');
        }
    };

    const handleContinueShopping = () => {
        // Navigate back to home page
        window.location.href = '/';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-xl">Loading cart...</div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Shopping Cart</h1>
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Add some courses to get started!</p>
                    <button 
                        onClick={handleContinueShopping}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Cart Items ({cartItems.length})</h2>
                        
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                                <img 
                                    src={item.img} 
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                />
                                
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600 text-sm">Online Course</p>
                                    <p className="text-blue-600 font-semibold">${item.price}</p>
                                </div>
                                
                                <div className="flex items-center space-x-2 mr-4">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <div className="text-right">
                                    <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax (10%):</span>
                                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <span className="text-lg font-bold text-blue-600">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                        >
                            Proceed to Checkout
                        </button>
                        
                        <button 
                            onClick={handleContinueShopping}
                            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Continue Shopping
                        </button>
                        
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">💡 Course Benefits</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Lifetime access to course content</li>
                                <li>• Certificate of completion</li>
                                <li>• 30-day money-back guarantee</li>
                                <li>• 24/7 support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;