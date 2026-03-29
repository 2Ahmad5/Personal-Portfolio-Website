export type BlogPost = {
  slug: string
  title: string
  date?: string
  excerpt: string
  content: string
}

type FrontMatter = {
  slug?: string
  title?: string
  date?: string
  excerpt?: string
}

const markdownModules = import.meta.glob('../../content/**/*.{md,markdown}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const parseFrontMatter = (rawMarkdown: string) => {
  if (!rawMarkdown.startsWith('---\n')) {
    return { data: {} as FrontMatter, content: rawMarkdown.trim() }
  }

  const endMarkerIndex = rawMarkdown.indexOf('\n---\n', 4)
  if (endMarkerIndex === -1) {
    return { data: {} as FrontMatter, content: rawMarkdown.trim() }
  }

  const frontMatterBlock = rawMarkdown.slice(4, endMarkerIndex)
  const content = rawMarkdown.slice(endMarkerIndex + 5).trim()
  const data: FrontMatter = {}

  frontMatterBlock.split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return

    const key = line.slice(0, separatorIndex).trim() as keyof FrontMatter
    const rawValue = line.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^['"]|['"]$/g, '')

    if (key === 'slug' || key === 'title' || key === 'date' || key === 'excerpt') {
      data[key] = value
    }
  })

  return { data, content }
}

const makeExcerpt = (markdown: string) => {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[>#*_~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plainText) return 'No excerpt provided.'
  if (plainText.length <= 140) return plainText
  return `${plainText.slice(0, 140).trimEnd()}...`
}

const fileNameToSlug = (filePath: string) => {
  const segments = filePath.split('/')
  const fileName = segments[segments.length - 1] ?? ''
  return fileName.replace(/\.md$/, '')
}

const shouldIncludePost = (filePath: string) => {
  const segments = filePath.split('/')
  const fileName = (segments[segments.length - 1] ?? '').toLowerCase()
  return fileName !== 'readme.md' && !fileName.startsWith('_')
}

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export const blogPosts: BlogPost[] = Object.entries(markdownModules)
  .filter(([filePath]) => shouldIncludePost(filePath))
  .map(([filePath, rawMarkdown]) => {
    const { data: frontMatter, content } = parseFrontMatter(rawMarkdown)

    const fallbackSlug = fileNameToSlug(filePath)
    const slug = normalizeSlug(frontMatter.slug ?? fallbackSlug)
    const title = frontMatter.title?.trim() || fallbackSlug.replace(/[-_]/g, ' ')

    return {
      slug,
      title,
      date: frontMatter.date,
      excerpt: frontMatter.excerpt?.trim() || makeExcerpt(content),
      content,
    }
  })
  .sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0
    const timeB = b.date ? new Date(b.date).getTime() : 0
    return timeB - timeA
  })

export const findPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === normalizeSlug(slug))
