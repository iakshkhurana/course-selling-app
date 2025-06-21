import { useState, useEffect } from "react";
import Course from "../components/course-component";
import { courseAPI, cartAPI } from "../services/api";

function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fallback course data in case API fails
    const fallbackCourses = [
        {
            id: 1,
            name: "Web Development Bootcamp",
            description: "Master HTML, CSS, JS, and React from scratch.",
            img: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png",
            price: 99.99
        },
        {
            id: 2,
            name: "Data Science with Python",
            description: "Learn data analysis, visualization, and machine learning.",
            img: "https://tagmango.com/publicassets/-red-white-modern-youtube-thumbnail---2025-01-31t122658-ca68ff4d455a45e90336c31594458346.jpg",
            price: 149.99
        },
        {
            id: 3,
            name: "Advanced Node.js",
            description: "Deep dive into backend development with Node.js and Express.",
            img: "https://do6gp1uxl3luu.cloudfront.net/banner+and+logos/namaste-node-banner.webp",
            price: 129.99
        },
        {
            id: 4,
            name: "Data Structures and Algorithms",
            description: "Problem Solving in C++.",
            img: "https://d502jbuhuh9wk.cloudfront.net/courses/65f18ee126fbec3af08dca99/65f18ee126fbec3af08dca99_scaled_cover.jpg?v=1",
            price: 89.99
        }
    ];

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Try to fetch from backend
            const response = await courseAPI.getAllCourses();
            
            // If backend returns proper course data, use it
            if (response && Array.isArray(response)) {
                setCourses(response);
            } else {
                // Use fallback data if backend doesn't return proper course array
                console.log('Using fallback course data');
                setCourses(fallbackCourses);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses');
            // Use fallback data on error
            setCourses(fallbackCourses);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (course) => {
        try {
            cartAPI.addToCart(course);
            alert(`${course.name} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart');
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-600 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading courses...</div>
            </div>
        );
    }

    if (error && courses.length === 0) {
        return (
            <div className="bg-gray-600 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-[url('https://i.pinimg.com/736x/dd/6e/91/dd6e91c364ff7be3f48a04db182a8357.jpg')] bg-cover bg-center h-screen min-h-screen">
            <div className="flex flex-wrap justify-center pt-8">
                {courses.map((course) => (
                    <div key={course.id} className="relative">
                        <Course Label={course} onBuyNow={handleAddToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;