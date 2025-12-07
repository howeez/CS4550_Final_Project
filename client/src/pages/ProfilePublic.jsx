import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api.js';

export default function ProfilePublic() {
  const { profileId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/users/${profileId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [profileId]);

  if (!data) return <div className="p-6">Loading...</div>;

  const { user, reviews, bookmarks } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
        {user.bio && <p className="text-gray-700 mb-2">{user.bio}</p>}
        <p className="text-gray-500 text-sm">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Recent Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-sm">No reviews yet.</p>
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
        <h2 className="text-xl font-semibold mb-3">Recent Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p className="text-gray-600 text-sm">No bookmarks yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {bookmarks.map(bm => (
              <li key={bm._id}>
                <span className="font-mono text-xs">{bm.externalId}</span>{' '}
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
