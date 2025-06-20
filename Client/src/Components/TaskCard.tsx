import type { TaskProps } from "../Types/Types"
import { Avatar, Box, Card, Typography } from "@mui/material"
import { Draggable } from "@hello-pangea/dnd"

function TaskCard({task, index }: TaskProps & {index: number}) {
    

  return (
    <Draggable draggableId={task.id.toString()} index = {index}>
        {(provided) => (
            <Card
            sx={{
                marginBottom: '1rem',
                padding: '1rem',
                width: 'auto',
            }}
            
            ref = {provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <Typography variant="subtitle1">
              {task.title}
            </Typography>
            <Box>
            </Box>
        </Card>
        )}
    </Draggable>
  )
}

export default TaskCard