import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import ProfilePublic from './pages/ProfilePublic.jsx';
import Search from './pages/Search.jsx';
import Details from './pages/Details.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminAddBook from './pages/AdminAddBook.jsx';
import AdminEditBook from './pages/AdminEditBook.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:profileId" element={<ProfilePublic />} />

        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/books/new"
          element={
            <AdminRoute>
              <AdminAddBook />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/books/:id/edit"
          element={
            <AdminRoute>
              <AdminEditBook />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}
