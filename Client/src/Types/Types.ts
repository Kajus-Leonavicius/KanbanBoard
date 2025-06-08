import { Task } from "@mui/icons-material"

export type Board = {
    id: number,
    name: string,
    created_at: string
    owner: number
}

export type Props = {
    board: Board
    onClick?: () => void
}

export type Columns = {
    id: number
    name: string
    board_id: number
}

export type Task = {
    id: number
    title: string
    description:string,
    status: string
}
