import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: totalPhotos }, { count: totalOrders }, { data: recentOrders }, { count: pendingOrders }] =
    await Promise.all([
      supabase.from('prints').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*, prints(title)').order('created_at', { ascending: false }).limit(5),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ])

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl uppercase tracking-widest text-[#bbcac6] mb-2">Dashboard</h1>
      <p className="font-label text-xs tracking-widest text-white/30 uppercase mb-12">Overview</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        <StatCard label="Total Photos" value={totalPhotos ?? 0} href="/admin/photos" />
        <StatCard label="Total Orders" value={totalOrders ?? 0} href="/admin/orders" />
        <StatCard label="Pending Orders" value={pendingOrders ?? 0} href="/admin/orders" accent />
      </div>

      {/* Quick actions */}
      <div className="flex gap-4 mb-16">
        <Link
          href="/admin/photos/new"
          className="bg-[#bbcac6] text-[#0e1510] font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#dde5dc] transition-colors"
        >
          + Upload New Photo
        </Link>
        <Link
          href="/admin/orders"
          className="border border-white/20 text-[#bbcac6] font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-colors"
        >
          View Orders
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-label text-xs uppercase tracking-[0.25em] text-white/40 mb-6">Recent Orders</h2>
        {!recentOrders || recentOrders.length === 0 ? (
          <p className="text-white/30 font-body text-sm">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-px">
            {recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-[#111a13] border border-white/5 px-6 py-4"
              >
                <div>
                  <p className="font-body text-sm text-[#bbcac6]">{order.customer_name}</p>
                  <p className="font-label text-[10px] text-white/40 tracking-wider mt-1">
                    {order.customer_email} · {order.prints?.title ?? '—'}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {order.total_amount && (
                    <span className="font-label text-sm text-white/60">${Number(order.total_amount).toFixed(2)}</span>
                  )}
                  <span
                    className={`font-label text-[10px] uppercase tracking-widest px-3 py-1 ${
                      order.status === 'fulfilled'
                        ? 'bg-emerald-900/40 text-emerald-400'
                        : 'bg-amber-900/30 text-amber-400'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  href,
  accent = false,
}: {
  label: string
  value: number
  href: string
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className="bg-[#111a13] border border-white/10 p-8 hover:border-[#bbcac6]/30 transition-colors group block"
    >
      <p className="font-display text-5xl text-[#bbcac6] mb-3 group-hover:text-white transition-colors">
        {value}
      </p>
      <p
        className={`font-label text-[10px] uppercase tracking-[0.25em] ${
          accent ? 'text-amber-400' : 'text-white/40'
        }`}
      >
        {label}
      </p>
    </Link>
  )
}
