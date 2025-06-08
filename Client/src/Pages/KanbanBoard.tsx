import React from 'react'
import Column from '../Components/Column'
import TaskCard from '../Components/TaskCard'

function KanbanBoard() {
  return (
    <div>
      <Column>
        <TaskCard/>
      </Column>
    </div>
  )
}

export default KanbanBoard