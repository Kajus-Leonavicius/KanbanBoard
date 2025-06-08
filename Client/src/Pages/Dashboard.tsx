import { Alert, Box, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchData } from "../utils/APICalls"
import { useNavigate } from "react-router-dom"
import BoardCard from "../Components/BoardCard"
import type { Board } from "../Types/Types"

function Dashboard() {


    const [data, setData] = useState<Board[]> ([])
    const navigate = useNavigate()

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const result = await fetchData<Board[]>('http://127.0.0.1:5000/board/')
                console.log(result)

                setData(result)
            }catch{
                console.log('error fetching data')
            }
        }
        getData()
    }, [])
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
    </Box>
  )
}

export default Dashboard