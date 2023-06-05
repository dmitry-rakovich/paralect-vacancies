import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Favoritespage from './pages/Favoritespage'
import Vacancyspage from './pages/Vacancypage'
import { useEffect } from 'react'
import Layout from './components/Layout'

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
      })
    }
    if (JSON.parse(localStorage.getItem('paralect_token')).ttl * 1000 < Date.now()) {
      const paramString = new URLSearchParams({
          refresh_token: JSON.parse(localStorage.getItem('paralect_token')).refresh_token,
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_APP_ID
        })
        fetch(import.meta.env.VITE_REFRESH_TOKEN_URL + paramString, {
          headers: {
            "x-secret-key": import.meta.env.VITE_SECRET_KEY,
            "X-Api-App-Id": import.meta.env.VITE_APP_ID,
          },
        })
        .then((res) => res.json())
        .then((data) => localStorage.setItem("paralect_token", JSON.stringify(data)))
        // .then(() => location.reload())
    }
  }, [])
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage />} />
          <Route path="favorites" element={<Favoritespage />} />
          <Route path="vacancy/:id" element={<Vacancyspage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
