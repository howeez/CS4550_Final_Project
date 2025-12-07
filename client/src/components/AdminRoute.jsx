import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!user.roles?.includes('admin')) return <Navigate to="/" />;

  return children;
}
