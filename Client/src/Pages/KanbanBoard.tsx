import { Alert, Box, Button } from '@mui/material'
import Column from '../Components/Column'
import { useEffect, useState } from 'react'
import type { Columns } from '../Types/Types'
import { fetchData } from '../utils/APICalls'
import { useParams } from 'react-router-dom'

function KanbanBoard() {
  //states
  const [columns, setColumns] = useState<Columns[]>([])
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
}, [board_id])


  return (
    <Box sx={{display: 'flex', height: '100%', overflowY: 'hidden'}}>
      {columns.length > 0 ? 
        columns.map((column) =>(
          <Column key={column.id} column={column}></Column>
        )):
        <Alert severity='info'>No Columns yet </Alert>
    }
    <Button>add Column</Button>
    </Box>
  )
}

export default KanbanBoard