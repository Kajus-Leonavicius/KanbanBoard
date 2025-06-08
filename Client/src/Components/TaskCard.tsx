import { Alert, Box, Button, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import type { Task } from "../Types/Types"
import { fetchData } from "../utils/APICalls"

function TaskCard() {

    const [tasks, setTasks] = useState<Task[]> ([])

    useEffect(()=> {
        const fetchTasks = async () =>{
            try{
                const result = await fetchData<Task[]>('http://127.0.0.1:5000/task')
                console.log(result)
                setTasks(result)
            }catch{
                console.log('error fetching data')
            }
        }

        fetchTasks()
    },[])
  return (
    <Card>
        {tasks.length > 0 ? 
            tasks.map((task) =>(
                <Card key={task.id}>
                    <Typography variant="subtitle1">
                        {task.title}
                    </Typography>
                </Card>
            ))
        :<Box></Box>}
    </Card>
  )
}

export default TaskCard