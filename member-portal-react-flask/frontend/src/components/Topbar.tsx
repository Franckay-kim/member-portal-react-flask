import { useAuth } from '../context/AuthContext';

export default function Topbar() {
    const { user } = useAuth();
    return (
        <header className="bg-white shadow p-4 flex justify-end items-center">
            <span className="mr-4">Welcome, {user?.email}</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>
    );
}
