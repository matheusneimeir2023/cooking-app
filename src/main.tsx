import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// 1. Check if the browser even supports Service Workers
if ("serviceWorker" in navigator) {

  // 2. Wait until the entire webpage completely finishes loading
  window.addEventListener("load", () => {
    
    // 3. Point the browser to your file and tell it to start running it
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("Service Worker registered successfully!", reg.scope))
      .catch(err => console.log("Service Worker registration failed:", err));
  });
}