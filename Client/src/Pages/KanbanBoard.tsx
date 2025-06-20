import { Alert, Box, Button, Modal } from '@mui/material'
import Column from '../Components/Column'
import { useEffect, useState } from 'react'
import type { Columns } from '../Types/Types'
import { fetchData, sendData } from '../utils/APICalls'
import { useParams } from 'react-router-dom'
import NewTask from '../Components/NewTask'
import { DragDropContext } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'

function KanbanBoard() {
  //states
  const [columns, setColumns] = useState<Columns[]>([])
  const [modal, setModal] = useState(false)
  const [columnId, setColumnId] = useState(Number)
  const [body, setBody] = useState({name: ''})
  const {board_id} = useParams()
  //functions
  useEffect(()=>{
  const getColumns = async () =>{
    try{
      const result = await fetchData<Columns[]>(`http://127.0.0.1:5000/boards/${board_id}/columns`)
      setColumns(result)
    }catch{
      console.log('error')
    }
  }
  getColumns()
}, [board_id, ])

const handleDrag = async (result: DropResult) => {
    const {source, destination, draggableId} = result

    if (
    !destination || 
    (source.droppableId === destination.droppableId && source.index === destination.index)
    ) {
        return;
      }

    try{
      const task_id = Number(draggableId)
      await fetch(`http://127.0.0.1:5000/task/${task_id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({column_id: Number(destination.droppableId)})
      })
      {/*it works but in future chenge this code to save index of task  */}
      const updated = await fetchData <Columns[]>(`http://127.0.0.1:5000/boards/${board_id}/columns`)
      setColumns(updated)
    }catch{
      console.log('error')
  } 
}

const addColumn = async () =>{
  try{
    body.name = 'Enter Column name'
    const column = await sendData(`http://127.0.0.1:5000/boards/${board_id}/columns`, body)
    {/*again not very good solution but it does its job */}
    const updated = await fetchData <Columns[]>(`http://127.0.0.1:5000/boards/${board_id}/columns`)
    setColumns(updated)
    return column
  }catch{
    console.log('error')
  }
}

  return (
    <DragDropContext onDragEnd={handleDrag}>
    <Box sx={{display: 'flex', height: '100vh', overflowY: 'hidden', overflowX: 'auto'}} bgcolor= 'background.default'>
      {columns.length > 0 ? 
        columns.map((column) =>(
            <Column setColumns={setColumns} column={column} onAddTaskClick={(id)=>{setColumnId(id); setModal(!modal)}}></Column>
        )):
        <Alert severity='info'>No Columns yet </Alert>
      }
      <Button onClick={()=> addColumn()}>add Column</Button>

      <Modal open={modal} onClose={() => setModal(!modal)} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <NewTask columnId={columnId}></NewTask>
      </Modal>
    </Box>
    </DragDropContext>
  )
}

export default KanbanBoard