import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage.tsx'
import { PersonalPage } from './pages/PersonalPage.tsx'
import { SlotsPage } from './pages/SlotsPage.tsx'
import { AdminPanel } from './pages/AdminPanel.tsx'
import { PersonalAccount } from './pages/PersonalAccount.tsx'
import { AviatorGame } from './pages/AviatorGame.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/slots" element={<SlotsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/account" element={<PersonalAccount />} />
        <Route path="/aviator" element={<AviatorGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

