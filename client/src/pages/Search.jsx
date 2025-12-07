import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Card from '../components/Card.jsx';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [term, setTerm] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(data => {
        const items = (data.items || []).map(item => ({
          id: item.id,
          title: item.volumeInfo?.title,
          author: (item.volumeInfo?.authors || [])[0],
        }));
        setResults(items);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    setParams({ q: term });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Search Google Books</h1>
      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Search for any book title..."
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(b => (
            <Card key={b.id} title={b.title} subtitle={b.author}>
              <Link className="text-blue-600 hover:underline" to={`/details/${b.id}`}>
                View details
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
