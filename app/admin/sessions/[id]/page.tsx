import { notFound } from 'next/navigation'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SessionEditForm } from '@/components/admin/SessionEditForm'

export default async function AdminEditSessionPage({ params }: { params: { id: string } }) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light text-black">Modifier une session</h1>
        <p className="mt-3 text-gray-700">Supabase n’est pas configuré.</p>
      </div>
    )
  }

  const supabase = createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light text-black">Modifier une session</h1>
        <p className="mt-3 text-gray-700">Non authentifié.</p>
      </div>
    )
  }

  const { data, error } = await supabase
    .from('sessions')
    .select('id, offer_id, format, start_date, end_date, region_code, department_code, city, city_insee_code')
    .eq('id', params.id)
    .maybeSingle()

  if (error || !data) return notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
        <h1 className="text-3xl font-light text-black mt-2">Modifier une session</h1>
        <p className="mt-2 text-gray-600">Mise a jour des informations de session.</p>
      </div>

      <SessionEditForm
        id={data.id}
        initial={{
          offerId: data.offer_id,
          format: data.format,
          startDate: data.start_date,
          endDate: data.end_date,
          regionCode: data.region_code,
          departmentCode: data.department_code,
          city: data.city,
          cityInseeCode: data.city_insee_code,
        }}
      />
    </div>
  )
}
