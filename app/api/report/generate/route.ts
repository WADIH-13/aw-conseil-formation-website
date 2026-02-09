import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { validateReportPayload } from '@/lib/report/validatePayload'

export async function GET() {
  const script = path.join(process.cwd(), 'scripts', 'generate-sample-pdf-node.js');
  try {
    const res = spawnSync('node', [script], { cwd: process.cwd(), timeout: 20000 });
    if (res.error) {
      return NextResponse.json({ error: String(res.error) }, { status: 500 });
    }
    // read generated file
    const outPath = path.join(process.cwd(), 'AW_Score_Sample_Node.pdf');
    if (!fs.existsSync(outPath)) {
      return NextResponse.json({ error: 'PDF not generated' }, { status: 500 });
    }
    const data = await fs.promises.readFile(outPath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AW_Score.pdf"'
      }
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = validateReportPayload(body)

    if (!parsed.valid) {
      return NextResponse.json({ errors: parsed.errors }, { status: 400 })
    }

    // NOTE: require statique (évite les exports invalides + warning webpack "dependency is an expression").
    const mod = require('../../../../scripts/generate-sample-pdf-node.js') as {
      generateSync?: (data: any, options?: any) => Buffer
    }

    if (!mod || typeof mod.generateSync !== 'function') {
      return NextResponse.json({ error: 'Generator function not found' }, { status: 500 })
    }

    const payload = parsed.value
    const buffer = mod.generateSync(
      {
        awScore: payload.awScore,
        date: payload.date,
        levelLabel: payload.levelLabel,
        dimensionScores: payload.dimensionScores,
        reportType: payload.reportType,
      },
      {
        showDisclaimer: payload.showDisclaimer,
        showNonIndividualNotice: payload.showNonIndividualNotice,
        includeNoDataStoredNotice: payload.includeNoDataStoredNotice,
      }
    )
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AW_Score.pdf"',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
