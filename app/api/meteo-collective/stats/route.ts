import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Cette fonctionnalité n'expose plus de statistiques serveur : l'outil Météo collective est désormais local-only (aucune donnée enregistrée).",
    },
    { status: 410 }
  )
}
