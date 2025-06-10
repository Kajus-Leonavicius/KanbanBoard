import { Box, Input, Typography, Button } from "@mui/material"
import { useState } from "react"
import { sendData } from "../utils/APICalls"

import type { ColumnId } from "../Types/Types"

function NewTask({columnId}: ColumnId) {
        const [body, setBody] = useState({title: '', description: '', status: '', column_id: columnId ,created_by: 1})

        const addTask = async() => {
            console.log(body)
            console.log(columnId)

            try{
                const result = await sendData(`http://127.0.0.1:5000/task/${columnId}`, body)

                return result
            }catch{
                console.log('error occured')
            }
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
            const {name, value} = e.target
            setBody(prev => ({...prev, [name]: value}))
        }
  return (
    <Box>
        <Typography variant="subtitle1">Uzduoties title</Typography>
        <Input onChange={handleChange} name = 'title' value={body.title}></Input>
        <Typography variant="subtitle1">uzduoties descripton</Typography>
        <Input onChange={handleChange} name = 'description' value={body.description}></Input>
        <Typography variant="subtitle1"> statusas</Typography>
        <Input onChange={handleChange} name = 'status' value={body.status}></Input>
        <Button onClick={()=> addTask()}>Submit</Button>
        
    </Box>
  )
}

export default NewTask