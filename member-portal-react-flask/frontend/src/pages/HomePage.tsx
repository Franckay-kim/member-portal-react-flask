import { useState } from 'react'
import {
    LayoutDashboard,
    Banknote,
    CreditCard,
    LogOut,
    UserCircle,
    DollarSign,
    BellRing,
    Settings,
    HelpCircle,
    ArrowUpRight,
    Calendar,
    ChevronRight,
    Wallet,
    TrendingUp,
    ChevronLeft,
    Search,
    PanelLeftClose,
    PanelLeftOpen,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
    LineChart,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Line as RechartsLine,
    Bar,
} from 'recharts'

export function HomePage() {
    const navigate = useNavigate()
    const userName = 'Frankline'
    const [activeNavItem, setActiveNavItem] = useState('Dashboard')
    const [notifications, setNotifications] = useState(3)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)

    const contributionData = [
        { month: 'Jan', amount: 10000 },
        { month: 'Feb', amount: 10000 },
        { month: 'Mar', amount: 10000 },
        { month: 'Apr', amount: 12000 },
        { month: 'May', amount: 10000 },
    ]

    const loanData = [
        { name: 'Emergency Loan', amount: 50000 },
        { name: 'Development Loan', amount: 70000 },
    ]

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Loan Application', icon: Banknote },
        { name: 'Investments', icon: DollarSign },
        { name: 'Transactions', icon: CreditCard },
        { name: 'Settings', icon: Settings },
        { name: 'Help', icon: HelpCircle },
    ]

    const handleNavigation = (itemName: string) => {
        setActiveNavItem(itemName)
        navigate(`/${itemName.toLowerCase().replace(' ', '-')}`)
    }

    const quickActions = [
        {
            name: 'Apply for Loan',
            icon: Banknote,
            color: 'from-blue-600 to-blue-700',
            route: '/loan-application',
        },
        {
            name: 'Make Deposit',
            icon: Wallet,
            color: 'from-emerald-500 to-emerald-600',
            route: '/deposit',
        },
        {
            name: 'View Statement',
            icon: CreditCard,
            color: 'from-violet-500 to-violet-600',
            route: '/transactions',
        },
    ]

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(value)
    }

    const recentTransactions = [
        { id: 1, type: 'Withdrawal', amount: 5000, date: 'May 18, 2025', status: 'Completed' },
        { id: 2, type: 'Deposit', amount: 10000, date: 'May 15, 2025', status: 'Completed' },
        { id: 3, type: 'Loan Payment', amount: 12500, date: 'May 10, 2025', status: 'Completed' },
    ]

    const upcomingPayments = [
        { id: 1, description: 'Loan Installment', amount: 12500, dueDate: 'Jun 10, 2025' },
        { id: 2, description: 'Monthly Contribution', amount: 10000, dueDate: 'Jun 05, 2025' },
    ]

    const notificationItems = [
        {
            id: 1,
            message: 'Your loan application has been approved',
            time: '2 hours ago',
            read: false,
        },
        {
            id: 2,
            message: 'Upcoming payment reminder: Monthly contribution',
            time: '1 day ago',
            read: false,
        },
        {
            id: 3,
            message: 'Dividend payment received',
            time: '3 days ago',
            read: false,
        },
    ]

    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900">
            {/* Sidebar */}
            <aside
                className={`${isCollapsed ? 'w-24' : 'w-72'
                    } hidden min-h-screen shrink-0 border-r border-slate-800 bg-slate-950 text-white transition-all duration-300 lg:flex`}
            >
                <div className="flex w-full flex-col">
                    {/* Brand */}
                    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/20">
                                MP
                            </div>

                            {!isCollapsed && (
                                <div>
                                    <div className="text-sm font-semibold tracking-wide text-white">
                                        Member Portal
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Enterprise Dashboard
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
                        >
                            {isCollapsed ? (
                                <PanelLeftOpen className="h-5 w-5" />
                            ) : (
                                <PanelLeftClose className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 px-4 py-5">
                        {!isCollapsed && (
                            <div className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Navigation
                            </div>
                        )}

                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = activeNavItem === item.name

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.name)}
                                        className={`group flex w-full items-center rounded-2xl transition-all ${isCollapsed
                                                ? 'justify-center px-3 py-3.5'
                                                : 'justify-between px-4 py-3.5'
                                            } ${isActive
                                                ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10'
                                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <Icon className="h-5 w-5 shrink-0" />
                                            {!isCollapsed && (
                                                <span className="ml-3 text-sm font-medium">
                                                    {item.name}
                                                </span>
                                            )}
                                        </div>

                                        {!isCollapsed && isActive && (
                                            <ChevronRight className="h-4 w-4 text-slate-400" />
                                        )}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Profile + Logout */}
                    <div className="border-t border-slate-800 p-4">
                        {!isCollapsed && (
                            <div className="mb-4 rounded-2xl bg-slate-900 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/20">
                                        <UserCircle className="h-7 w-7 text-blue-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold text-white">
                                            {userName}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            Regular Member
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => navigate('/')}
                            className={`flex w-full items-center rounded-2xl text-red-300 transition hover:bg-red-500/10 hover:text-red-200 ${isCollapsed
                                    ? 'justify-center px-3 py-3.5'
                                    : 'justify-start px-4 py-3.5'
                                }`}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                {/* Top bar */}
                <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                        <div>
                            <p className="text-sm font-medium text-blue-600">Dashboard</p>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Welcome back, {userName}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
                                <Search className="h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:bg-slate-50"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                >
                                    <BellRing className="h-5 w-5 text-slate-600" />
                                    {notifications > 0 && (
                                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                                            {notifications}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                                        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                                            <h3 className="text-sm font-semibold text-slate-800">
                                                Notifications
                                            </h3>
                                            <button className="text-xs font-medium text-blue-600 hover:underline">
                                                Mark all as read
                                            </button>
                                        </div>

                                        <div className="max-h-72 overflow-y-auto">
                                            {notificationItems.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <p
                                                            className={`text-sm ${notification.read
                                                                    ? 'text-slate-500'
                                                                    : 'text-slate-800'
                                                                }`}
                                                        >
                                                            {notification.message}
                                                        </p>
                                                        {!notification.read && (
                                                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                                                        )}
                                                    </div>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-slate-100 px-4 py-3">
                                            <button
                                                className="w-full text-center text-sm font-medium text-blue-600 hover:underline"
                                                onClick={() => navigate('/notifications')}
                                            >
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <UserCircle className="h-7 w-7 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">
                                        {userName}
                                    </div>
                                    <div className="text-xs text-slate-500">Regular Member</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
                    {/* Hero */}
                    <section className="relative mb-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-900/10">
                        <div className="absolute right-0 top-0 h-48 w-48 translate-x-10 -translate-y-10 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl" />

                        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-100">
                                    Financial overview
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                    Welcome back, {userName}
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                                    Here’s a quick overview of your account position,
                                    contributions, active obligations, and recent activity.
                                </p>
                            </div>

                            <div className="min-w-[220px] rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <div className="text-sm text-blue-100">Total Portfolio Value</div>
                                <div className="mt-2 text-3xl font-bold">
                                    {formatCurrency(245000)}
                                </div>
                                <div className="mt-2 text-xs text-blue-100">
                                    Updated today
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick actions */}
                    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {quickActions.map((action) => (
                            <button
                                key={action.name}
                                onClick={() => navigate(action.route)}
                                className={`group flex items-center justify-between rounded-[24px] bg-gradient-to-r ${action.color} px-5 py-5 text-white shadow-lg transition-transform hover:scale-[1.02]`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="rounded-2xl bg-white/15 p-2.5">
                                        <action.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-semibold">{action.name}</span>
                                </div>
                                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                        ))}
                    </section>

                    {/* Stat cards */}
                    <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Account Balance
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                        {formatCurrency(245000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-blue-50 p-3">
                                    <Wallet className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Available for withdrawal: {formatCurrency(165000)}
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Active Loans
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-red-500">
                                        {formatCurrency(120000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-red-50 p-3">
                                    <Banknote className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Next payment: {formatCurrency(12500)} on Jun 10, 2025
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Investments
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                                        {formatCurrency(80000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-3">
                                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Annual return: 8.5%
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Loan Limit
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-violet-600">
                                        {formatCurrency(500000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-violet-50 p-3">
                                    <CreditCard className="h-6 w-6 text-violet-600" />
                                </div>
                            </div>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-violet-500"
                                    style={{ width: '24%' }}
                                />
                            </div>

                            <p className="mt-3 text-sm text-slate-500">
                                24% utilized ({formatCurrency(120000)})
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Monthly Contributions
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-indigo-600">
                                        {formatCurrency(10000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-indigo-50 p-3">
                                    <Calendar className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Next contribution: Jun 05, 2025
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Dividend Projection
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-amber-500">
                                        {formatCurrency(35000)}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-amber-50 p-3">
                                    <DollarSign className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">
                                Expected payout: December 2025
                            </p>
                        </div>
                    </section>

                    {/* Charts */}
                    <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Contribution History
                                </h2>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                    Monthly
                                </span>
                            </div>

                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={contributionData}
                                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="month" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                        <RechartsLine
                                            type="monotone"
                                            dataKey="amount"
                                            name="Monthly Contribution"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Loan Distribution
                                </h2>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    Current
                                </span>
                            </div>

                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={loanData}
                                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                                        layout="vertical"
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e2e8f0"
                                            horizontal={false}
                                        />
                                        <XAxis type="number" stroke="#64748b" />
                                        <YAxis type="category" dataKey="name" width={140} stroke="#64748b" />
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                        <Bar
                                            dataKey="amount"
                                            name="Loan Amount"
                                            fill="#60A5FA"
                                            radius={[0, 10, 10, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </section>

                    {/* Tables / lists */}
                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Recent Transactions
                                </h2>
                                <button
                                    className="flex items-center text-sm font-medium text-blue-600 hover:underline"
                                    onClick={() => navigate('/transactions')}
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </button>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {recentTransactions.map((transaction) => {
                                    const negative =
                                        transaction.type === 'Withdrawal' ||
                                        transaction.type === 'Loan Payment'

                                    return (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between px-5 py-4 hover:bg-slate-50"
                                        >
                                            <div>
                                                <div className="font-medium text-slate-800">
                                                    {transaction.type}
                                                </div>
                                                <div className="mt-1 text-sm text-slate-500">
                                                    {transaction.date}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div
                                                    className={`text-base font-semibold ${negative ? 'text-red-500' : 'text-emerald-600'
                                                        }`}
                                                >
                                                    {negative ? '-' : '+'}
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-500">
                                                    {transaction.status}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Upcoming Payments
                                </h2>
                                <button
                                    className="flex items-center text-sm font-medium text-blue-600 hover:underline"
                                    onClick={() => navigate('/calendar')}
                                >
                                    View Calendar
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </button>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {upcomingPayments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex flex-col gap-4 px-5 py-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <div className="font-medium text-slate-800">
                                                {payment.description}
                                            </div>
                                            <div className="mt-1 text-sm text-slate-500">
                                                Due: {payment.dueDate}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-base font-semibold text-slate-900">
                                                {formatCurrency(payment.amount)}
                                            </div>
                                            <button
                                                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                                onClick={() => navigate('/make-payment')}
                                            >
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}