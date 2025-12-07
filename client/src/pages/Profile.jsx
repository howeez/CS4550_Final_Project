import { useEffect, useState } from 'react';
import API from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const [me, setMe] = useState(null);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    API.get('/users/me')
      .then(res => {
        setMe(res.data);
        setBio(res.data.bio || '');
        setEmail(res.data.email || '');
        API.get('/reviews', { params: { userId: res.data._id } })
          .then(r => setReviews(r.data));
        API.get('/bookmarks', { params: { userId: res.data._id } })
          .then(r => setBookmarks(r.data));
      })
      .catch(err => console.error(err));
  }, []);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put('/users/me', { bio, email });
      setMe(res.data);
    } finally {
      setSaving(false);
    }
  }

  if (!me) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{me.username}</h1>
        <p className="text-gray-700 mb-2">Roles: {me.roles?.join(', ')}</p>
        <form onSubmit={save} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              className="w-full border rounded p-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              className="w-full border rounded p-2"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
          <button
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">My Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-sm">You haven&apos;t posted any reviews yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {reviews.map(r => (
              <li key={r._id}>
                <span className="font-semibold">Rating:</span> {r.rating || '-'} / 5<br />
                <span className="font-semibold">Review:</span> {r.text}<br />
                <span className="text-gray-500 text-xs">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">My Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p className="text-gray-600 text-sm">No bookmarks yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {bookmarks.map(bm => (
              <li key={bm._id}>
                <Link
                  className="text-blue-600 hover:underline"
                  to={`/details/${bm.externalId}`}
                >
                  {bm.externalId}
                </Link>{' '}
                <span className="text-gray-500 text-xs">
                  saved {new Date(bm.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
