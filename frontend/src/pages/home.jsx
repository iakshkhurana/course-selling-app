import { useState } from "react";
import Navbar from "../components/Navbar-Component"
import Course from "../components/course-component"
import Sidebar from "../components/sidebar"

function Home(){
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-600 min-h-screen">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : ''}`}>
        <div className="flex flex-wrap justify-center pt-8">
          <Course Label={{ name: "Web Development Bootcamp", description: "Master HTML, CSS, JS, and React from scratch." , img : "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png"}} />
          <Course Label={{ name: "Data Science with Python", description: "Learn data analysis, visualization, and machine learning." , img:"https://tagmango.com/publicassets/-red-white-modern-youtube-thumbnail---2025-01-31t122658-ca68ff4d455a45e90336c31594458346.jpg"}} />
          <Course Label={{ name: "Advanced Node.js", description: "Deep dive into backend development with Node.js and Express." , img : "https://do6gp1uxl3luu.cloudfront.net/banner+and+logos/namaste-node-banner.webp" }} />
          <Course Label={{ name: "Data Structures and Algorithms", description: "Problem Solving in C++ ." , img: "https://d502jbuhuh9wk.cloudfront.net/courses/65f18ee126fbec3af08dca99/65f18ee126fbec3af08dca99_scaled_cover.jpg?v=1" }} />
        </div>
      </div>
    </div>
  );
}

export default Home;