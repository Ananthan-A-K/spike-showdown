import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BracketProvider } from './context/BracketContext';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Schedule from './pages/Schedule/Schedule';
import Teams from './pages/Teams/Teams';
import Brackets from './pages/Brackets/Brackets';
import AdminBrackets from './pages/Admin/AdminBrackets';
import Rules from './pages/Rules/Rules';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import Gallery from './pages/Gallery/Gallery';

export default function App() {
  return (
    <BracketProvider>
      <div className="app-root">
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Pages router content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/brackets" element={<Brackets />} />
            <Route path="/admin" element={<AdminBrackets />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BracketProvider>
  );
}
