import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import _ from 'lodash'
import '@atlaskit/css-reset'
import styled from 'styled-components'

import initialData from '../../initial-data'
import Column from '../column'

const Container = styled.div`
  display:flex;
`

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...initialData,
      containerOrder: ['container_1', 'container_2', 'container_3']
    };
  }

  componentDidMount() {
    const { getContainers } = this.props;
    getContainers();
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  renderColumns() {
    const { containers } = this.props;
    
    if (containers !== undefined && containers.length > 0) {
      containers.map(container => {
        const todos = container.todos;
        console.log(todos);
  
        return (
          <Column key={container.id} column={container} todos={todos} />
        )
      })
    } else {
      return <p>There are no data in containers...</p>
    }
  }

  render() {    
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.renderColumns()}
        </Container>
      </DragDropContext>
    )
  }
}