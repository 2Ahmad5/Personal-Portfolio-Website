import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import './blog.css'
import BlogApp from './BlogApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogApp />
  </StrictMode>,
)
