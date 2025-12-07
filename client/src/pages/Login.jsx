import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(identifier, password);
      const dest = location.state?.from || '/';
      nav(dest);
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Username or Email</label>
          <input
            className="w-full border rounded p-2"
            placeholder="username or email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="text-sm mt-2">
          No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
