export type ReportDimensionScore = {
  label: string
  value: number
}

export type ReportPayload = {
  awScore: number
  date: string
  levelLabel?: string
  dimensionScores?: ReportDimensionScore[]
  showMedicalNotice: boolean
}

export type ReportPayloadValidationResult =
  | { valid: true; errors: []; value: ReportPayload }
  | { valid: false; errors: string[]; value?: undefined }

export function validateReportPayload(input: unknown): ReportPayloadValidationResult {
  try {
    const errors: string[] = []

    if (!input || typeof input !== 'object') {
      errors.push('body must be a JSON object')
      return { valid: false, errors }
    }

    const body = input as any
    const out: ReportPayload = {
      awScore: 0,
      date: new Date().toISOString().slice(0, 10),
      showMedicalNotice: true,
    }

    let awScore: number | null = null
    if (typeof body.awScore === 'number') awScore = body.awScore
    else if (typeof body.awScore === 'string' && body.awScore.trim() !== '' && !Number.isNaN(Number(body.awScore))) {
      awScore = Number(body.awScore)
    }

    if (awScore === null || Number.isNaN(awScore)) {
      errors.push('`awScore` requis (nombre 0-100)')
    } else {
      out.awScore = Math.max(0, Math.min(100, Math.round(awScore)))
    }

    if (body.date) out.date = String(body.date)
    if (body.levelLabel) out.levelLabel = String(body.levelLabel)

    if (Array.isArray(body.dimensionScores)) {
      out.dimensionScores = body.dimensionScores.map((d: any) => ({
        label: d && d.label ? String(d.label) : '',
        value: Number.isNaN(Number(d && d.value)) ? 0 : Math.max(0, Math.min(100, Number(d.value))),
      }))
    }

    out.showMedicalNotice = body.showMedicalNotice === false ? false : true

    if (errors.length > 0) return { valid: false, errors }
    return { valid: true, errors: [], value: out }
  } catch (e) {
    return { valid: false, errors: [String(e)] }
  }
}
