import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type ContactPayload = {
  nom: string
  organisation?: string
  email: string
  telephone?: string
  sujet: string
  message: string
  consent: boolean
}

const getEnv = (key: string) => process.env[key]

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload

    if (
      !payload?.nom ||
      !payload?.email ||
      !payload?.sujet ||
      !payload?.message ||
      !payload?.consent
    ) {
      return NextResponse.json(
        { message: 'Merci de compléter tous les champs obligatoires.' },
        { status: 400 }
      )
    }

    const host = getEnv('SMTP_HOST')
    const port = Number(getEnv('SMTP_PORT') || '587')
    const user = getEnv('SMTP_USER')
    const pass = getEnv('SMTP_PASS')
    const from = getEnv('SMTP_FROM') || user
    const to = getEnv('CONTACT_TO') || 'ahmed.wadih@gmail.com'

    if (!host || !user || !pass || !from) {
      return NextResponse.json(
        { message: "Le service d'envoi n'est pas configuré." },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    const subject = `[AW Conseil et Formation] ${payload.sujet} - ${payload.nom}`

    const text = `Nom: ${payload.nom}\nOrganisation: ${payload.organisation || 'Non renseignée'}\nEmail: ${payload.email}\nTéléphone: ${payload.telephone || 'Non renseigné'}\nSujet: ${payload.sujet}\n\nMessage:\n${payload.message}`

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
        <h2>Nouvelle demande depuis le site</h2>
        <p><strong>Nom :</strong> ${payload.nom}</p>
        <p><strong>Organisation :</strong> ${payload.organisation || 'Non renseignée'}</p>
        <p><strong>Email :</strong> ${payload.email}</p>
        <p><strong>Téléphone :</strong> ${payload.telephone || 'Non renseigné'}</p>
        <p><strong>Sujet :</strong> ${payload.sujet}</p>
        <p><strong>Message :</strong><br/>${payload.message.replace(/\n/g, '<br/>')}</p>
      </div>
    `

    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject,
      text,
      html,
    })

    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    )
  }
}
