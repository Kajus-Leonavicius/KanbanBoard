import { Alert, Box, Button, Typography } from '@mui/material'
import { fetchData } from '../utils/APICalls'
import { useEffect, useState } from 'react'
import type { Columns } from '../Types/Types'
import { useParams } from 'react-router-dom'

function Column({children}) {

    const [data, setData] = useState<Columns[]> ([])
    const {board_id} = useParams()

    useEffect(()=>{
            const getData = async ()=>{
                try{
                    const result = await fetchData<Columns[]>(`http://127.0.0.1:5000/boards/${board_id}/columns`)
                    console.log(result)
    
                    setData(result)
                }catch{
                    console.log('error fetching data')
                }
            }
            getData()
        }, [board_id])
  return (
    <Box sx={{display: 'flex'}}>
        {data.length > 0 ? 
            data.map((column)=>(
                <Box
                    key={column.id}
                    sx={{
                        border: 'solid 1px black',
                        width: '20rem',
                        textAlign: 'center',
                        height: 'auto',
                        padding: '0.5rem',
                        marginRight: '1rem'
                    }}
                >
                <Typography variant='subtitle1'>
                    {column.name}
                </Typography>
                {children}
                <Button>Add New Task</Button>
                </Box>
            ))
        : <Box>
            <Alert severity='info'>no columns yet add one!</Alert> 
            <Button>Add new Column</Button>
        </Box> }
    </Box>
  )
}

export default Column