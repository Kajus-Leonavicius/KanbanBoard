import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import KanbanBoard from './Pages/KanbanBoard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/KanbanBoard/board_id:id/board_name:name' element={<KanbanBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App