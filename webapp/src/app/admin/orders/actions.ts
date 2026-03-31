'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markOrderFulfilled(orderId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('orders')
    .update({ status: 'fulfilled' })
    .eq('id', orderId)

  if (error) return { error: error.message }

  revalidatePath('/admin/orders')
  revalidatePath('/admin')
  return { success: true }
}
