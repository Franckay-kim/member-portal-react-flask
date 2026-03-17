import React, { useState } from 'react'
import {
    EyeIcon,
    EyeOffIcon,
    LockIcon,
    MailIcon,
    ShieldCheckIcon,
    ChevronRightIcon,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import loginBg from '../assets/login-bg.jpg'

// Form input component
const FormInput = ({
    icon: Icon,
    type = 'text',
    label,
    value,
    onChange,
    ...props
}: {
    icon: React.ElementType
    type?: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    [key: string]: any
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
            {label}
        </label>
        <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Icon className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
            </div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                {...props}
            />
        </div>
    </div>
)

// Radio option component
const RadioOption = ({
    id,
    checked,
    onChange,
    title,
    subtitle,
}: {
    id: string
    checked: boolean
    onChange: () => void
    title: string
    subtitle: string
}) => (
    <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
            checked
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                : 'border-slate-200 bg-white/90 hover:border-slate-300'
        }`}
    >
        <input
            id={id}
            name="token-method"
            type="radio"
            checked={checked}
            onChange={onChange}
            className="mt-1 h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <div>
            <div className="text-sm font-semibold text-slate-800">{title}</div>
            <div className="text-xs text-slate-500">{subtitle}</div>
        </div>
    </label>
)

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenMethod, setTokenMethod] = useState('email-token')

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/verify-otp')
    }

    const tokenOptions = [
        {
            id: 'email-token',
            title: 'Email OTP',
            subtitle: 'Receive a one-time verification code via email',
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
                    {/* image overlay */}
                    <div className="absolute inset-0 bg-slate-950/45" />

                    {/* animated gradient layer */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.30),rgba(14,165,233,0.18),rgba(15,23,42,0.45))]" />

                    {/* floating blur accents */}
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
                            Secure access to your account.
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
                                    Welcome back
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                    Sign in to continue
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Enter your login details below and continue with secure
                                    verification.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <FormInput
                                    icon={MailIcon}
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

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

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Send login OTP via
                                    </label>
                                    <div className="space-y-3">
                                        {tokenOptions.map((option) => (
                                            <RadioOption
                                                key={option.id}
                                                id={option.id}
                                                checked={tokenMethod === option.id}
                                                onChange={() => setTokenMethod(option.id)}
                                                title={option.title}
                                                subtitle={option.subtitle}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    Remember me
                                </label>

                                <button
                                    type="submit"
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                >
                                    Send OTP
                                    <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Member Access
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <p className="text-center text-sm text-slate-600">
                                Don&apos;t have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Create Account
                                </Link>
                            </p>
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