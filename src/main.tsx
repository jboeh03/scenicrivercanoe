import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// No StrictMode: it double-invokes effects, which fights the single GSAP ticker /
// Lenis / Three.js render loop. We manage our own cleanup carefully instead.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
