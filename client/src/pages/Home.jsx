import { useEffect, useState } from 'react';
import API from '../services/api.js';
import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    API.get('/books')
      .then(res => setBooks(res.data.slice(0, 8)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to Libris</h1>
      <p className="text-gray-700 mb-6">
        A tiny social network around books. Books sourced from google books or added by admin.
      </p>

      {user ? (
        <p className="mb-6">
          Logged in as <span className="font-semibold">{user.username}</span>.
        </p>
      ) : (
        <p className="mb-6">
          <Link to="/login" className="text-blue-600 underline">Login</Link> or{' '}
          <Link to="/register" className="text-blue-600 underline">Register</Link> to join the community.
        </p>
      )}

      <h2 className="text-xl font-semibold mb-3">Latest Books:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map(b => (
          <Card key={b._id} title={b.title} subtitle={b.author}>
            <Link className="text-blue-600 hover:underline" to={`/details/${b.externalId || b._id}`}>
              View details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
