export type PostStatus = 'draft' | 'scheduled' | 'published'

export type PostWorkflowRow = {
  status: PostStatus
  publish_at: Date | null
  published_at: Date | null
}

export function applyPublishDue(
  posts: PostWorkflowRow[],
  now: Date,
): { updated: PostWorkflowRow[]; publishedCount: number } {
  let publishedCount = 0

  const updated: PostWorkflowRow[] = posts.map((post) => {
    if (post.status !== 'scheduled') return post
    if (!post.publish_at) return post
    if (post.publish_at.getTime() > now.getTime()) return post

    publishedCount += 1
    return {
      ...post,
      status: 'published',
      published_at: new Date(now),
    }
  })

  return { updated, publishedCount }
}
