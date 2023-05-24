import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Favoritespage from './pages/Favoritespage'
import Vacancyspage from './pages/Vacancypage'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    if(!localStorage.getItem('paralect_token')) {
      fetch(import.meta.env.VITE_TOKEN_URL, {
        headers: {
          "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        },
      }).then((res) => res.json())
      .then((data) => {
        localStorage.setItem("paralect_token", JSON.stringify(data))
      }).then(() => location.reload())
    } else if (JSON.parse(localStorage.getItem('paralect_token')).ttl * 1000 < Date.now()) {
      const paramString = new URLSearchParams({
        refresh_token: JSON.parse(localStorage.getItem('paralect_token')).refresh_token,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_SECRET_KEY
      })
      fetch(import.meta.env.VITE_REFRESH_TOKEN_URL + paramString, {
        headers: {
          "x-secret-key": import.meta.env.VITE_SECRET_KEY,
        },
      }).then((res) => res.json()).then((data) => localStorage.setItem("paralect_token", JSON.stringify(data))).then(() => location.reload())
    }
  }, [])
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favorites" element={<Favoritespage />} />
          <Route path="/vacancy/:id" element={<Vacancyspage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
