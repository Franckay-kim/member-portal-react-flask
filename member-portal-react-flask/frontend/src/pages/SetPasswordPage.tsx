import React, { useState } from 'react'
import {
    EyeIcon,
    EyeOffIcon,
    LockIcon,
    KeyIcon,
    ShieldCheckIcon,
    CheckCircle2Icon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import loginBg from '../assets/login-bg.jpg'

export function SetPasswordPage() {
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log('OTP:', otp, 'Password:', password)
        setSuccess(true)

        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    const passwordChecks = [
        { label: 'At least 8 characters', valid: password.length >= 8 },
        { label: 'Contains an uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Contains a number', valid: /\d/.test(password) },
        {
            label: 'Matches confirmation',
            valid: password.length > 0 && password === confirmPassword,
        },
    ]

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-100">
            {/* soft page background accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.10),_transparent_30%)]" />
            <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute bottom-[-100px] right-[-60px] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
                {/* Left panel with image */}
                <aside
                    className="relative hidden lg:flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: `url(${loginBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-slate-950/45" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.30),rgba(14,165,233,0.18),rgba(15,23,42,0.45))]" />
                    <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />

                    <div className="relative z-10 max-w-md px-10 text-center text-white">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                                <ShieldCheckIcon className="h-8 w-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight">
                            Member Portal
                        </h1>

                        <p className="mt-4 text-sm text-slate-200">
                            Complete account setup.
                        </p>
                    </div>
                </aside>

                {/* Right form section */}
                <main className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
                    <div className="w-full max-w-lg animate-[fadeInUp_.55s_ease-out]">
                        <div className="mb-6 text-center lg:hidden">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                                <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
                                Member Portal
                            </div>
                        </div>

                        <section className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                                    Password setup
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                    Set your password
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Enter the OTP and create a secure password to finish
                                    setting up your account.
                                </p>
                            </div>

                            <AnimatePresence>
                                {success && (
                                    <motion.div
                                        className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CheckCircle2Icon className="h-4 w-4" />
                                        Password set successfully. Redirecting to login...
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* OTP Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        OTP
                                    </label>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <KeyIcon className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                                        </div>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter the OTP"
                                            required
                                            className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        New password
                                    </label>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <LockIcon className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3.5 pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Confirm password
                                    </label>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <LockIcon className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3.5 pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOffIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Password requirements */}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
                                    <p className="mb-3 text-sm font-medium text-slate-700">
                                        Password requirements
                                    </p>
                                    <div className="space-y-2">
                                        {passwordChecks.map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <CheckCircle2Icon
                                                    className={`h-4 w-4 ${
                                                        item.valid
                                                            ? 'text-emerald-500'
                                                            : 'text-slate-300'
                                                    }`}
                                                />
                                                <span
                                                    className={
                                                        item.valid
                                                            ? 'text-slate-700'
                                                            : 'text-slate-500'
                                                    }
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                >
                                    Set Password
                                </button>
                            </form>
                        </section>

                        <footer className="mt-6 text-center text-xs text-slate-500">
                            <p>© 2026 Member Portal Demo</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    )
}