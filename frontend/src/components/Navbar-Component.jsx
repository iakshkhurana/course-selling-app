import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ onMenuClick }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // This effect runs on mount and when the user logs in/out via another tab.
    useEffect(() => {
        const checkUser = () => {
            try {
                const userData = localStorage.getItem('user');
                setUser(userData ? JSON.parse(userData) : null);
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="w-full h-16 px-4 flex items-center justify-between bg-gray-800 text-white">
            {/* Left Section: menu button */}
            <div>
                <button onClick={onMenuClick} className="bg-gray-700 px-3 py-1 rounded hover:bg-black cursor-pointer " >☰</button>
            </div>

            {/* Right Section: multiple buttons aligned right */}
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/')} className="bg-gray-700 px-4 py-1 rounded hover:bg-black cursor-pointer">Home</button>
                
                {user && user.isAuthenticated ? (
                    <>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 cursor-pointer"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-lg font-bold"
                            title="Profile"
                        >
                            {user.email ? user.email.charAt(0).toUpperCase() : 'P'}
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/signin')} className="bg-gray-700 px-4 py-1 rounded hover:bg-black cursor-pointer ">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 cursor-pointer ">Sign Up</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;