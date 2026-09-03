import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Code-split every route but the landing page, so visiting one page never
// downloads the JS for the others.
const ServicePage = lazy(() => import('@/pages/services/ServicePage'))
const Media = lazy(() => import('@/pages/Media'))
const Testimonials = lazy(() => import('@/pages/Testimonials'))
const BlogIndex = lazy(() => import('@/pages/blog/BlogIndex'))
const BlogPost = lazy(() => import('@/pages/blog/BlogPost'))
const Contact = lazy(() => import('@/pages/Contact'))
const Accessibility = lazy(() => import('@/pages/Accessibility'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<Navigate to="/#about" replace />} />
            <Route path="services/:slug" element={<ServicePage />} />
            <Route path="media" element={<Media />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="articles" element={<BlogIndex />} />
            <Route path="articles/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="accessibility-statement" element={<Accessibility />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
