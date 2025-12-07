import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';

export default function AdminAddBook() {
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', description: '', externalId: '' });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    await API.post('/books', form);
    nav('/admin');
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            className="w-full border rounded p-2"
            placeholder="Title"
            value={form.title}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            name="author"
            className="w-full border rounded p-2"
            placeholder="Author"
            value={form.author}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
            placeholder="Description"
            value={form.description}
            onChange={update}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">External ID (google book volume)</label>
          <input
            name="externalId"
            className="w-full border rounded p-2"
            placeholder="Optional:"
            value={form.externalId}
            onChange={update}
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
