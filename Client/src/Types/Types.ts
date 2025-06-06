
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