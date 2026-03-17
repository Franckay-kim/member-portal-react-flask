import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function OTPVerification() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const { login } = useAuth();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await API.post('/auth/verify', { email, otp });
        if (res.data.success) {
            login({ email });
            navigate('/');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleVerify} className="bg-white p-8 shadow rounded space-y-4">
                <h2 className="text-xl font-semibold">Enter OTP</h2>
                <input
                    className="border px-4 py-2 w-full"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">Verify</button>
            </form>
        </div>
    );
}
