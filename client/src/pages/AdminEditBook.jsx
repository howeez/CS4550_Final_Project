import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api.js';

export default function AdminEditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    API.get(`/books/${id}`).then(res => setForm(res.data)).catch(console.error);
  }, [id]);

  if (!form) return <div className="p-6">Loading...</div>;

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    await API.put(`/books/${id}`, form);
    nav('/admin');
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            className="w-full border rounded p-2"
            value={form.title}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            name="author"
            className="w-full border rounded p-2"
            value={form.author}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
            value={form.description || ''}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">External ID (Google Books volume ID)</label>
          <input
            name="externalId"
            className="w-full border rounded p-2"
            value={form.externalId || ''}
            onChange={update}
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
