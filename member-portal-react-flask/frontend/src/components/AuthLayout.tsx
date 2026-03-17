import React from 'react'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'

type AuthLayoutProps = {
  badge?: string
  title: string
  subtitle: string
  children: React.ReactNode
}

const defaultPoints = [
  'Secure access to member-facing services',
  'Modern portal experience with protected workflows',
  'Built using scalable full stack integration patterns',
]

export default function AuthLayout({
  badge = 'Secure Portal Access',
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%)]" />
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-60px] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        <section className="hidden px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              {badge}
            </div>

            <div className="mt-12 max-w-xl">
              <h1 className="text-5xl font-bold leading-tight">
                Modern enterprise-grade
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  member portal experience
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                {subtitle}
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {defaultPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                  <span className="text-sm text-slate-200">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-slate-200">
              Trusted digital access
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              A clean and secure experience for authentication, onboarding, and
              access to portal services.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-lg">
            <div className="rounded-[28px] border border-white/10 bg-white/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  {badge}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {title}
                </h2>
              </div>

              {children}
            </div>

            <div className="mt-6 text-center text-xs text-slate-400">
              © 2026 Member Portal Demo
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}