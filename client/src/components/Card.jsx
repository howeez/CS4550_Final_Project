export default function Card({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      <div className="mt-3 text-sm text-gray-800">
        {children}
      </div>
    </div>
  );
}
