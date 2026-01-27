import { validateReportPayload } from '../lib/report/validatePayload'

describe('Payload Validation', () => {
  it('should validate a correct payload', () => {
    const payload = {
      awScore: 75,
      date: '2026-01-26',
      levelLabel: 'Modéré',
      dimensionScores: [
        { label: 'Cognitif', value: 75 },
        { label: 'Émotionnel', value: 50 },
      ],
      showMedicalNotice: true,
    };

    const result = validateReportPayload(payload)
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.value).toMatchObject(payload);
  });

  it('should return errors for an invalid payload', () => {
    const payload = {
      awScore: 'invalid',
      dimensionScores: [
        { label: 'Cognitif', value: 'not-a-number' },
      ],
    };

    const result = validateReportPayload(payload)
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should handle missing optional fields', () => {
    const payload = {
      awScore: 50,
    };

    const result = validateReportPayload(payload)
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.value.date).toBeDefined();
    expect(result.value.levelLabel).toBeUndefined();
  });
});