import { Alert, Box, Button, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchData, sendData } from "../utils/APICalls"
import { useNavigate } from "react-router-dom"
import BoardCard from "../Components/BoardCard"
import type { Board } from "../Types/Types"

function Dashboard() {


    const [data, setData] = useState<Board[]> ([])

    const navigate = useNavigate()

    const getData = async ()=>{
            try{
                const token = localStorage.getItem('access_token') 
                const result = await fetchData<Board[]>('http://127.0.0.1:5000/board/', token)
                console.log(result)

                setData(result)
            }catch{
                console.log('error fetching data')
            }
        }

    useEffect(()=>{
        
        getData()
    }, [])

    const addBoard = async () => {
        try{
            const Board = { name: 'new Board'}
            const token = localStorage.getItem('access_token') 
            console.log('board access token', token)
            const result = await sendData('http://127.0.0.1:5000/board/', Board, token )
            getData()
        }catch (error){
            console.log('error: ', error)
        }
    }
  return (
    <Box>
        <Typography variant="h4">
            Boards
        </Typography>
        <Divider orientation="horizontal"/>
        <Box>
            {data. length > 0?
                data.map((board) =>(
                    <BoardCard  onClick={() => navigate(`/KanbanBoard/${board.id}/${encodeURIComponent(board.name)}`)}
                    key={board.id}
                    board={board}/>
                ))
            : <Alert severity="error"> you dont gave any boards create one!</Alert>}
        </Box>
        <Button onClick={()=> addBoard()}> + ADD NEW BOARD</Button>
    </Box>
  )
}

export default Dashboard