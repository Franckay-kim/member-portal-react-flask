import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import { ShieldCheckIcon, CheckCircle2Icon, RefreshCwIcon } from 'lucide-react'
import loginBg from '../assets/login-bg.jpg'

export function VerifyOtpPage() {
    const [otp, setOtp] = useState('')
    const [success, setSuccess] = useState(false)
    const [expired, setExpired] = useState(false)
    const [resendCount, setResendCount] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (expired) {
            alert('This OTP has expired. Please request a new one.')
            return
        }

        setSuccess(true)

        setTimeout(() => {
            navigate('/homepage')
        }, 2000)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setExpired(true)
        }, 5 * 60 * 1000)

        return () => clearTimeout(timer)
    }, [resendCount])

    const handleResendOtp = () => {
        setExpired(false)
        setOtp('')
        setResendCount((prev) => prev + 1)
        alert('A new OTP has been sent to your email.')
    }

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
                            Verify your access.
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
                                    Verification
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                    Enter OTP
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Enter the 6-digit verification code sent to your
                                    email to continue.
                                </p>
                            </div>

                            {success && (
                                <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                    <CheckCircle2Icon className="h-4 w-4" />
                                    OTP verified successfully. Redirecting to homepage...
                                </div>
                            )}

                            {expired && (
                                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                    Your OTP has expired.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex justify-center">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderInput={(props) => (
                                            <input
                                                {...props}
                                                type="tel"
                                                className="mx-1 h-14 w-12 rounded-2xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:h-16 sm:w-14"
                                            />
                                        )}
                                        containerStyle="flex justify-center"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                >
                                    Verify OTP
                                </button>

                                <div className="text-center text-sm text-slate-600">
                                    Didn&apos;t receive the code?{' '}
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        className="inline-flex items-center gap-2 font-medium text-blue-700 hover:text-blue-800"
                                    >
                                        <RefreshCwIcon className="h-4 w-4" />
                                        Resend OTP
                                    </button>
                                </div>
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