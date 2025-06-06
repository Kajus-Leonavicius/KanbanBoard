
import { Box, Card, Typography } from '@mui/material'
import type { Props } from '../Types/Types'

function BoardCard({board, onClick}: Props) {

  return (
    <Box sx={{display: 'inline-block'}}>
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                marginRight: '2rem'
            }}
            onClick={onClick}
        >
            <Typography variant='subtitle1'>
                {board.name}
            </Typography>
        </Card>
    </Box>
  )
}

export default BoardCard