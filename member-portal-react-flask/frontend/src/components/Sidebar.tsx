import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow h-full p-4 space-y-4">
            <h2 className="text-xl font-bold">Portal</h2>
            <nav className="space-y-2">
                <Link to="/" className="block p-2 hover:bg-gray-200 rounded">Dashboard</Link>
                <Link to="/some-feature" className="block p-2 hover:bg-gray-200 rounded">Feature</Link>
            </nav>
        </aside>
    );
}
