import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// On stocke l'élément root dans une variable pour éviter de parcourir
// le DOM plusieurs fois (infime gain, mais meilleure pratique)
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)