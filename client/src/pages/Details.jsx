import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import API from '../services/api.js';

export default function Details() {
  const { id } = useParams();
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(r => r.json())
      .then(data => setDetails(data))
      .catch(console.error);

    API.get('/reviews', { params: { externalId: id } })
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, [id]);

  async function addReview(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const res = await API.post('/reviews', {
        externalId: id,
        text,
        rating
      });
      setReviews(prev => [res.data, ...prev]);
      setText('');
    } finally {
      setSaving(false);
    }
  }

  async function addBookmark() {
    if (!user) return;
    try {
      await API.post('/bookmarks', { externalId: id });
      setBookmarkSaved(true);
    } catch (err) {
      setBookmarkSaved(true);
    }
  }

  if (!details) return <div className="p-6">Loading...</div>;

  const vol = details.volumeInfo || {};
  const title = vol.title;
  const author = (vol.authors || []).join(', ');
  const desc = vol.description;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {author && <p className="text-xl text-gray-700 mb-4">{author}</p>}
        {desc && <p className="text-gray-800 text-sm" dangerouslySetInnerHTML={{ __html: desc }} />}
        {user && (
          <button
            onClick={addBookmark}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-70"
            disabled={bookmarkSaved}
          >
            {bookmarkSaved ? 'Bookmarked' : 'Bookmark'}
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {user ? (
          <form onSubmit={addReview} className="space-y-3 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Rating</label>
              <select
                className="border rounded p-2 text-right"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Review</label>
              <textarea
                className="w-full border rounded p-2"
                placeholder="Write your thoughts..."
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            <button
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-70"
            >
              {saving ? 'Posting...' : 'Post Review'}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-600">
            <strong>Login</strong> to write a review or bookmark this book.
          </p>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-600 text-sm">No reviews yet.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {reviews.map(r => (
              <li key={r._id} className="border-t pt-2">
                <p>
                  <span className="font-semibold">Rating:</span>{' '}
                  <span className="inline-block min-w-[2rem] text-right">{r.rating || '-'}</span> / 5
                </p>
                <p>{r.text}</p>
                <p className="text-gray-500 text-xs">
                  by{' '}
                  <a
                    href={`/profile/${r.author._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {r.author.username}
                  </a>{' '}
                  on {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
