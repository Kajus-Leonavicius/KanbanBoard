import { Task } from "@mui/icons-material"
import type { Dispatch, SetStateAction } from "react"

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

export type ColProps = {
    column: Columns
    onAddTaskClick: (ColumnId: number) => void
    setColumns: Dispatch<SetStateAction<Columns[]>>
}

export type Task = {
    id: number
    title: string
    description:string,
    status: string
    column_id: number
}

export type TaskProps = {
    task: Task
}

export type ColumnId = {
    columnId: number
}

export type TaskModalProps = {
    task: Task
}

export type User = {
    id: number
    access_token: string
    name: string
    surname: string
}