import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Cette fonctionnalité n'enregistre aucune donnée côté serveur. Utilisez la page /meteo-collective (local-only).",
    },
    { status: 410 }
  )
}
