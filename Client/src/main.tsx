import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './utils/DarkTheme.ts'
import './main.css'
createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
  <DndProvider backend={HTML5Backend}>
    <StrictMode>
            <App />
    </StrictMode>,
  </DndProvider>
 </ThemeProvider>
)
