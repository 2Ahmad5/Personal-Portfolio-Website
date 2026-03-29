import type { ReactNode } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { blogPosts, findPostBySlug } from './blogData'

const BlogShell = ({
  children,
  backHref,
  backLabel,
  internalBack = false,
  title,
}: {
  children: ReactNode
  backHref: string
  backLabel: string
  internalBack?: boolean
  title?: string
}) => (
  <main className="blog-page">
    <header className="blog-header">
      {internalBack ? (
        <Link className="back-arrow" to={backHref} aria-label={`Back to ${backLabel}`}>
          <span className="hover-label">{backLabel}</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      ) : (
        <a className="back-arrow" href={backHref} aria-label={`Back to ${backLabel}`}>
          <span className="hover-label">{backLabel}</span>
          <span aria-hidden="true">&larr;</span>
        </a>
      )}
      {title ? (
        <div className="blog-copy">
          <h1>{title}</h1>
        </div>
      ) : null}
    </header>
    {children}
  </main>
)

const BlogIndexPage = () => {
  if (blogPosts.length === 0) {
    return (
      <BlogShell backHref="/" backLabel="portfolio" title="Blog">
        <section className="blog-content">
          <p className="status">No blogs published</p>
        </section>
      </BlogShell>
    )
  }

  return (
    <BlogShell backHref="/" backLabel="portfolio" title="Blog">
      <section className="blog-content" aria-label="Published posts">
        {blogPosts.map((post) => (
          <article key={post.slug} className="post-row">
            <h2>
              <Link to={`/${post.slug}`} className="post-link">
                {post.title}
              </Link>
            </h2>
            {post.date ? <p className="post-date">{post.date}</p> : null}
            <p className="post-excerpt">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </BlogShell>
  )
}

const BlogPostPage = () => {
  const { slug } = useParams()
  const post = slug ? findPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <BlogShell backHref="/" backLabel="blogs" internalBack title={post.title}>
      <article className="blog-post-content markdown-content">
        {post.date ? <p className="post-date">{post.date}</p> : null}
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </BlogShell>
  )
}

const BlogApp = () => {
  return (
    <BrowserRouter basename="/blog">
      <Routes>
        <Route path="/" element={<BlogIndexPage />} />
        <Route path="/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default BlogApp
