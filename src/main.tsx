import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.createElement('web-spriter-gpt')
container.attachShadow({ mode: 'open' })
const el = document.createElement('div')
el.id = 'root'
document.body.appendChild(container)
container.shadowRoot?.appendChild(el)

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
