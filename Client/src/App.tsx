import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import KanbanBoard from './Pages/KanbanBoard'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/KanbanBoard/:board_id/:name' element={<KanbanBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App