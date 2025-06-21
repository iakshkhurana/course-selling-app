import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = () => {
        try {
            const userData = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            
            if (!userData || !token) {
                navigate('/signin');
                return;
            }
            
            setUser(JSON.parse(userData));
        } catch (error) {
            console.error('Error loading user profile:', error);
            navigate('/signin');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart'); // Clear cart on logout
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Please sign in to view your profile</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">👤 User Profile</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{user.email}</h3>
                                        <p className="text-gray-600">Member since {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <p className="mt-1 text-gray-900">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Account Status</label>
                                            <p className="mt-1 text-green-600 font-semibold">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Account Statistics */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-xl font-semibold mb-6">Account Statistics</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">0</div>
                                    <div className="text-gray-600">Courses Enrolled</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">0</div>
                                    <div className="text-gray-600">Certificates Earned</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">0</div>
                                    <div className="text-gray-600">Hours Learned</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                            
                            <div className="space-y-4">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Browse Courses
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/cart')}
                                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    View Cart
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/purchases')}
                                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    My Purchases
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/settings')}
                                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Settings
                                </button>
                                
                                <div className="border-t pt-4">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Complete courses to earn certificates</li>
                                    <li>• Track your learning progress</li>
                                    <li>• Update your profile regularly</li>
                                    <li>• Explore new courses weekly</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile; 