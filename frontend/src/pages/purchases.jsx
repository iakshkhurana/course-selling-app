import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courseAPI } from "../services/api";

function Purchases() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadPurchases();
    }, []);

    const loadPurchases = async () => {
        try {
            setLoading(true);
            setError("");
            
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await courseAPI.getUserPurchases();
            
            if (Array.isArray(response)) {
                // Add mock progress data since backend doesn't provide it yet
                const purchasesWithProgress = response.map(course => ({
                    ...course,
                    progress: Math.floor(Math.random() * 101), // Random progress
                    completed: Math.random() > 0.5,
                    purchaseDate: new Date().toISOString(), // Mock date
                    lastAccessed: new Date().toISOString(),
                }));
                 setPurchases(purchasesWithProgress);
            } else {
                setPurchases([]);
            }

        } catch (err) {
            console.error('Error loading purchases:', err);
            setError('Failed to load purchases. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getProgressColor = (progress) => {
        if (progress === 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getProgressText = (progress) => {
        if (progress === 100) return 'Completed';
        if (progress >= 75) return 'Almost Done';
        if (progress >= 50) return 'Halfway There';
        return 'Just Started';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading your purchases...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">📚 My Purchases</h1>
                
                {purchases.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">No purchases yet</h2>
                        <p className="text-gray-500 mb-6">Start your learning journey by purchasing your first course!</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {purchases.map((purchase) => (
                            <div key={purchase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <img 
                                        src={purchase.img} 
                                        alt={purchase.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    {purchase.completed && (
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            ✅ Completed
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {purchase.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{purchase.description}</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Progress</span>
                                            <span className="text-sm font-semibold text-gray-900">{purchase.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full ${getProgressColor(purchase.progress)}`}
                                                style={{ width: `${purchase.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{getProgressText(purchase.progress)}</p>
                                    </div>
                                    
                                    {/* Course Details */}
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                        <div>
                                            <span className="font-medium">Purchased:</span>
                                            <p>{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium">Last Accessed:</span>
                                            <p>{new Date(purchase.lastAccessed).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={() => alert(`Continue learning ${purchase.name}`)}
                                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            {purchase.completed ? 'Review Course' : 'Continue Learning'}
                                        </button>
                                        <button 
                                            onClick={() => alert(`Download certificate for ${purchase.name}`)}
                                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                            disabled={!purchase.completed}
                                        >
                                            Certificate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Learning Statistics */}
                {purchases.length > 0 && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Learning Statistics</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{purchases.length}</div>
                                <div className="text-gray-600">Total Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">
                                    {purchases.filter(p => p.completed).length}
                                </div>
                                <div className="text-gray-600">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600">
                                    {purchases.filter(p => !p.completed).length}
                                </div>
                                <div className="text-gray-600">In Progress</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">
                                    {Math.round(purchases.reduce((acc, p) => acc + p.progress, 0) / purchases.length)}%
                                </div>
                                <div className="text-gray-600">Average Progress</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Purchases; 