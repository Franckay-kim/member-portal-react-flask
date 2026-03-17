import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <Topbar />
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
                </div>
            </div>
        </div>
    );
}
