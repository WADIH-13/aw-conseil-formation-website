import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

const TARGET_DIRS = [
  path.join(ROOT, 'app'),
  path.join(ROOT, 'components'),
]

const EXCLUDE_DIRS = new Set([
  path.join(ROOT, 'app', 'api'),
  path.join(ROOT, 'app', 'admin'),
  path.join(ROOT, 'app', '(private)'),
  path.join(ROOT, 'app', '(private)', 'assessment'),
  path.join(ROOT, 'node_modules'),
  path.join(ROOT, '.next'),
])

const ALLOWED_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx'])

const BANNED = [
  { label: 'Debug:', pattern: /Debug:/g },
  { label: 'Demander un devis', pattern: /Demander un devis/gi },
  { label: 'diagnostic', pattern: /diagnostic/gi },
]

function isExcludedDir(dirPath) {
  for (const excluded of EXCLUDE_DIRS) {
    if (dirPath === excluded) return true
    if (dirPath.startsWith(excluded + path.sep)) return true
  }
  return false
}

function walk(dirPath, outFiles) {
  if (isExcludedDir(dirPath)) return

  let entries
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      walk(full, outFiles)
      continue
    }

    const ext = path.extname(entry.name)
    if (!ALLOWED_EXTS.has(ext)) continue
    outFiles.push(full)
  }
}

function toRel(p) {
  return path.relative(ROOT, p).split(path.sep).join('/')
}

function main() {
  const files = []
  for (const dir of TARGET_DIRS) walk(dir, files)

  const hits = []

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8')

    for (const banned of BANNED) {
      banned.pattern.lastIndex = 0
      if (!banned.pattern.test(content)) continue

      banned.pattern.lastIndex = 0
      let match
      while ((match = banned.pattern.exec(content)) !== null) {
        const index = match.index
        const before = content.slice(0, index)
        const line = before.split('\n').length
        hits.push({
          label: banned.label,
          file: toRel(filePath),
          line,
          excerpt: match[0],
        })
      }
    }
  }

  if (hits.length) {
    const grouped = new Map()
    for (const hit of hits) {
      const key = `${hit.label}`
      grouped.set(key, (grouped.get(key) ?? []).concat(hit))
    }

    console.error('Copy regression check failed: banned strings found.')
    for (const [label, items] of grouped.entries()) {
      console.error(`\n- ${label}`)
      for (const item of items) {
        console.error(`  - ${item.file}:${item.line}`)
      }
    }

    process.exitCode = 1
    return
  }

  console.log('Copy regression check passed.')
}

main()
