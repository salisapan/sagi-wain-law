import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import ServicePage from '@/pages/services/ServicePage'
import Media from '@/pages/Media'
import Testimonials from '@/pages/Testimonials'
import BlogIndex from '@/pages/blog/BlogIndex'
import BlogPost from '@/pages/blog/BlogPost'
import Contact from '@/pages/Contact'
import Accessibility from '@/pages/Accessibility'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
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
    </BrowserRouter>
  )
}

export default App
