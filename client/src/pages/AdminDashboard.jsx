import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api.js';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);

  const load = () => {
    API.get('/books').then(res => setBooks(res.data)).catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm('Delete this book?')) return;
    await API.delete(`/books/${id}`);
    load();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/books/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Book
        </Link>
      </div>

      <table className="w-full border-collapse bg-white rounded shadow overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100 border-b text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2 w-32 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{b.title}</td>
              <td className="p-2">{b.author}</td>
              <td className="p-2 text-right">
                <div className="inline-flex gap-2">
                  <Link
                    className="text-blue-600 hover:underline"
                    to={`/admin/books/${b._id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => remove(b._id)}
                  >
                    Del
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
