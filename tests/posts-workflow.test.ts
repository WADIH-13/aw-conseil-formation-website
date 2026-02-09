import { applyPublishDue } from '../lib/posts/workflow'

describe('applyPublishDue', () => {
  it('publishes a scheduled post in the past', () => {
    const now = new Date('2026-02-09T10:00:00.000Z')
    const { publishedCount, updated } = applyPublishDue(
      [
        {
          status: 'scheduled',
          publish_at: new Date('2026-02-09T09:00:00.000Z'),
          published_at: null,
        },
      ],
      now,
    )

    expect(publishedCount).toBe(1)
    expect(updated[0].status).toBe('published')
    expect(updated[0].published_at?.toISOString()).toBe(now.toISOString())
  })

  it('never publishes a draft post', () => {
    const now = new Date('2026-02-09T10:00:00.000Z')
    const { publishedCount, updated } = applyPublishDue(
      [
        {
          status: 'draft',
          publish_at: new Date('2026-02-09T09:00:00.000Z'),
          published_at: null,
        },
      ],
      now,
    )

    expect(publishedCount).toBe(0)
    expect(updated[0].status).toBe('draft')
    expect(updated[0].published_at).toBe(null)
  })

  it('does not publish a scheduled post in the future', () => {
    const now = new Date('2026-02-09T10:00:00.000Z')
    const { publishedCount, updated } = applyPublishDue(
      [
        {
          status: 'scheduled',
          publish_at: new Date('2026-02-09T11:00:00.000Z'),
          published_at: null,
        },
      ],
      now,
    )

    expect(publishedCount).toBe(0)
    expect(updated[0].status).toBe('scheduled')
    expect(updated[0].published_at).toBe(null)
  })
})
