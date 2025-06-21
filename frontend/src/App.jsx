import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import Cart from "./pages/cart";
import Purchases from "./pages/purchases";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Layout from "./Layout"; // This includes Sidebar + Navbar + <Outlet />
import AdminSignin from "./pages/admin/Signin";
import AdminSignup from "./pages/admin/Signup";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages (no layout) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin Auth routes */}
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Shared layout for all main routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Dashboard - No shared layout */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;