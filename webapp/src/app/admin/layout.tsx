import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/photos', label: 'Photos' },
  { href: '/admin/photos/new', label: '+ Add Photo' },
  { href: '/admin/orders', label: 'Orders' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0e1510] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/10 bg-[#111a13] flex flex-col pt-10 pb-6 fixed h-full">
        <div className="px-6 mb-10">
          <p className="font-display text-xl uppercase tracking-[0.15em] text-[#bbcac6]">Gallery</p>
          <p className="font-display text-xl uppercase tracking-[0.15em] text-[#bbcac6]">Studio</p>
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">Admin</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-label text-xs uppercase tracking-[0.18em] text-white/60 px-4 py-3 hover:bg-white/5 hover:text-[#bbcac6] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-6">
          <p className="font-label text-[10px] text-white/20 tracking-wider">
            {user.email}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 p-10 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}
