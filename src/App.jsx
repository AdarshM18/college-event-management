import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Dashboard from "./components/Dashboard";
import EventManagement from "./components/EventManagement";
import MerchandiseManagement from "./components/MerchandiseManagement";
import UserManagement from "./components/UserManagement";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Persist Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <Router>
          <nav className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-college-primary mb-8">College Admin</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="block px-4 py-2 hover:bg-college-secondary rounded">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="block px-4 py-2 hover:bg-college-secondary rounded">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/merchandise" className="block px-4 py-2 hover:bg-college-secondary rounded">
                    Merchandise
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="block px-4 py-2 hover:bg-college-secondary rounded">
                    Users
                  </Link>
                </li>
              </ul>

              <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </nav>

          <main className="ml-64 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventManagement />} />
              <Route path="/merchandise" element={<MerchandiseManagement />} />
              <Route path="/users" element={<UserManagement />} />
            </Routes>
          </main>
        </Router>
      )}
    </div>
  );
}
