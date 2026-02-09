import crypto from 'crypto'

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

export function isCronAuthorized(authorizationHeader: string | null, cronSecret: string | undefined): boolean {
  if (!cronSecret) return false
  if (!authorizationHeader) return false

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i)
  if (!match) return false

  const token = match[1].trim()
  if (!token) return false

  return safeEqual(token, cronSecret)
}
