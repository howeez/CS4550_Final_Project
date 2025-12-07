import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api.js';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
        roles: [form.role]
      });
      nav('/login');
    } catch (err) {
      setError('Registration failed. Try a different username/email.');
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            name="username"
            className="w-full border rounded p-2"
            placeholder="username"
            value={form.username}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded p-2"
            placeholder="email"
            value={form.email}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded p-2"
            placeholder="password"
            value={form.password}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === 'user'}
                onChange={update}
              />
              <span>User</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === 'admin'}
                onChange={update}
              />
              <span>Admin</span>
            </label>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
        <p className="text-sm mt-2">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
