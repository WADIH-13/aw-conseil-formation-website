import { isCronAuthorized } from '../lib/security/cronAuth'

describe('isCronAuthorized', () => {
  it('accepts correct bearer token', () => {
    expect(isCronAuthorized('Bearer secret123', 'secret123')).toBe(true)
  })

  it('rejects missing header', () => {
    expect(isCronAuthorized(null, 'secret123')).toBe(false)
  })

  it('rejects wrong token', () => {
    expect(isCronAuthorized('Bearer nope', 'secret123')).toBe(false)
  })

  it('rejects when secret env missing', () => {
    expect(isCronAuthorized('Bearer secret123', undefined)).toBe(false)
  })
})
