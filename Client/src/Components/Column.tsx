import { Alert, Box, Button, Input, Modal, Typography,} from '@mui/material'
import type { ColProps, Columns } from '../Types/Types'
import { useEffect, useState } from 'react'
import { fetchData } from '../utils/APICalls'
import type { Task } from '../Types/Types'
import TaskCard from './TaskCard'
import { Droppable } from '@hello-pangea/dnd'
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDetails from './TaskDetails'

function Column({column, onAddTaskClick, setColumns}: ColProps) {

const [tasks, setTask] = useState <Task[]>([])
const [editable, setEditable] = useState(false)
const [titleValue, setTitleValue] = useState(column.name)
const [selectedTask, setSelectedTask] = useState<Task | null>(null)


    useEffect(()=>{
        const getColumns = async () =>{
            try{
                const result = await fetchData<Task[]>(`http://127.0.0.1:5000/task/${column.id}`)
                setTask(result)
            }catch{
                console.log('error')
            }
        }
        getColumns()
    }, [column])

    const changeTitle = async() =>{
        if(titleValue !== column.name){
            try{
                const response = await fetch(`http://127.0.0.1:5000/boards/columns/${column.id}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({name: titleValue})
                })
                setEditable(false)
                setColumns((prevColumns) =>
                    prevColumns.map((col) =>
                    col.id === column.id ? { ...col, name: titleValue } : col
  )
)
            }catch{
                console.log('error')
            }
        }
    }

    const deleteColumn = async () => {
        try{
            const response = await fetch(`http://127.0.0.1:5000/boards/columns/${column.id}`, {
                method: 'DELETE'
            })
            setColumns((prevColumns) =>
            prevColumns.filter((col) => col.id !== column.id)
        );
        }catch{
            console.log('errror')
        }
    }

  return (
    <Droppable droppableId={column.id.toString()}>
        {(provided) => (
        <Box 
        sx={{
            borderRadius: '10px',
            marginLeft: '1rem',
            display: 'inline-block',
            marginRight: '2rem',
            marginTop: '1rem',
            height: '90vh',
            overflowY: 'auto',
            minWidth: '20rem',
            maxWidth: '20rem',
            overflowX: 'hidden'
        }}
        bgcolor='#1e1e1e'
        ref={provided.innerRef}
        {...provided.innerRef}
    >
        <Box sx={{
            minWidth: '15rem',
            textAlign: 'center',
            alignItems: 'center',
            width: 'auto'
        }}
        >
            {editable == true ? 
                <Input  onChange={(e) => setTitleValue(e.target.value)} onBlur={changeTitle} onKeyDown={(e) => {if(e.key ==='Enter') changeTitle()}} autoFocus value={titleValue}></Input>

                :<Box bgcolor='primary.main' display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={'0.5rem'}>
                    <Typography onClick={()=> setEditable(true)} variant='h5'>
                        {column.name} 
                    </Typography>
                    <DeleteIcon onClick={()=> deleteColumn()}/>
                </Box>
            }
            {tasks.length > 0 ? 
                tasks
                .map((task, index)=>(
                    <Box key={task.id} onClick={()=> setSelectedTask(task)} sx={{padding: '1rem'}}>
                        <TaskCard key={task.id} task={task} index={index}></TaskCard>
                    </Box>
                )): <Alert severity='info'> no tasks</Alert>
            }

            {selectedTask && (
                <Modal
                    open={true}
                    onClose={() => setSelectedTask(null)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <TaskDetails task={selectedTask}></TaskDetails>
                </Modal>
            )}

            {provided.placeholder}

            <Button onClick={() => onAddTaskClick(column.id)}>Add New Task</Button>
        </Box>
    </Box>
        )}
    </Droppable>
  )
}

export default Column