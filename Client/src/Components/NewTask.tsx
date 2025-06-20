import { Box, Input, Typography, Button, Divider } from "@mui/material"
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
    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '1rem'}} bgcolor='background.paper'>
        <Typography mb={'1rem'} variant="h4">ADD NEW TASK</Typography>
        <Divider orientation='horizontal'/>
        <Box mt={'1rem'} mb={'1rem'}>
            <Typography  variant="subtitle1">Uzduoties title</Typography>
            <Input onChange={handleChange} name = 'title' value={body.title}></Input>
            <Typography mt={'1rem'} variant="subtitle1">uzduoties descripton</Typography>
            <Input onChange={handleChange} name = 'description' value={body.description}></Input>
            <Typography mt={'1rem'} variant="subtitle1"> statusas</Typography>
            <Input onChange={handleChange} name = 'status' value={body.status}></Input>
        </Box>
        <Button onClick={()=> addTask()}>Submit</Button>
        
    </Box>
  )
}

export default NewTask