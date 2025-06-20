import { Box, Divider, Typography } from "@mui/material"
import type { TaskModalProps } from "../Types/Types"

function TaskDetails({task}: TaskModalProps) {
  return (
    <Box
        sx={{
            padding: '1rem',
            borderRadius: '5px'
        }}
        bgcolor='background.paper'
    >
        <Typography variant="h4">
            {task.title}
        </Typography>
        <Divider orientation='horizontal'/>
        <Box
            sx={{
                marginTop: '1rem'
            }}
        >
            <Typography variant="subtitle1">
                description:
            </Typography>
            {task.description}
        </Box>
    </Box>
  )
}

export default TaskDetails