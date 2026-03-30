import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-outline-variant/20 bg-surface-container-low flex flex-col pt-8">
        <h2 className="font-display text-2xl uppercase tracking-widest text-[#bbcac6] px-8 mb-12">Gallery<br/>Studio</h2>
        <nav className="flex flex-col gap-2 px-4">
          <a href="/admin" className="font-label text-xs uppercase tracking-[0.2em] text-on-surface px-4 py-3 hover:bg-surface-variant transition-colors">Dashboard</a>
          <a href="/admin/upload" className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6] px-4 py-3 bg-surface-variant transition-colors">Upload Print</a>
          <a href="/admin/orders" className="font-label text-xs uppercase tracking-[0.2em] text-on-surface px-4 py-3 hover:bg-surface-variant transition-colors">Manage Orders</a>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
