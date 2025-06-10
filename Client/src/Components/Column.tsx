import { Alert, Box, Button, Typography } from '@mui/material'
import type { ColProps } from '../Types/Types'
import { useEffect, useState } from 'react'
import { fetchData } from '../utils/APICalls'
import type { Task } from '../Types/Types'
import TaskCard from './TaskCard'

function Column({column}: ColProps) {

const [tasks, setTask] = useState <Task[]>([])

    useEffect(()=>{
      const getColumns = async () =>{
        try{
          const result = await fetchData<Task[]>(`http://127.0.0.1:5000/task`)
          setTask(result)
        }catch{
          console.log('error')
        }
      }
    
      getColumns()
    }, [])
  return (
    <Box 
        sx={{
            border: 'solid black 1px',
            display: 'inline-block',
            marginRight: '2rem',
            maxHeight: '90vh',
            overflowY: 'auto'
        }}
    >
        <Box sx={{
            padding: '1rem',
            minWidth: '15rem',
            textAlign: 'center',
        }}>
            <Typography variant='subtitle1'>
                {column.name}
            </Typography>
            {tasks.length > 0 ? 
                tasks
                .filter((task) => task.column_id === column.id)
                .map((task)=>(
                    <TaskCard task={task}></TaskCard>
                )): <Alert severity='info'> no tasks</Alert>
            }
            <Button>Add New Task</Button>
        </Box>
    </Box>
  )
}

export default Column