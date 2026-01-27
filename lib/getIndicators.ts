type IndicatorsShape = {
  year?: number | string
  satisfaction?: number | string | null
  objectives?: number | string | null
  participation?: number | string | null
}

export async function getIndicators(slug: string): Promise<IndicatorsShape | null> {
  try {
    const mod = await import('../data/indicators.json')
    const data = (mod as any).default ?? mod
    return data[slug] ?? null
  } catch (err) {
    return null
  }
}
