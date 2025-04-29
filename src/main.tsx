import React from 'react'
import ReactDOM from 'react-dom/client'
import { MonopolyGame } from './components/MonopolyGame'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MonopolyGame />
  </React.StrictMode>
)
