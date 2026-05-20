import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Photos from './pages/Photos'
import Travel from './pages/Travel'
import QA from './pages/QA'
import Registry from './pages/Registry'
import WeddingParty from './pages/WeddingParty'
import './App.css'

/** Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/our-story"     element={<OurStory />} />
        <Route path="/photos"        element={<Photos />} />
        <Route path="/travel"        element={<Travel />} />
        <Route path="/qa"            element={<QA />} />
        <Route path="/registry"      element={<Registry />} />
        <Route path="/wedding-party" element={<WeddingParty />} />
        {/* Catch-all → home */}
        <Route path="*"              element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
