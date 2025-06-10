import type { TaskProps } from "../Types/Types"
import { Card } from "@mui/material"

function TaskCard({task}: TaskProps) {
    

  return (
    <Card
        sx={{
            marginBottom: '1rem',
            padding: '1rem'
        }}
    >
        {task.title}
    </Card>
  )
}

export default TaskCard