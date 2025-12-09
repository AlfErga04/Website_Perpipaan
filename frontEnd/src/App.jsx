import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Perpipaan from "./pages/Perpipaan.jsx";
import Alumni from "./pages/Alumni.jsx";
import News from "./pages/News.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Merch from "./pages/Merch.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import ProfileOrder from "./pages/ProfileOrder.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";

function App() {
  return (
    <main className="main-content">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perpipaan" element={<Perpipaan />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/data-alumni" element={<Alumni />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-order" element={<ProfileOrder />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
