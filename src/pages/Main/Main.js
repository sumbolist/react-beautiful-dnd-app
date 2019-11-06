import React from "react";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import { firebaseDb, columnsRef, tasksRef } from "../../firebase/firebase";
import styled from "styled-components";

import initialData from "./initial-data";
import Column from "../../core/components/column";

const Container = styled.div`
  display: flex;
`;

export default class App extends React.Component {
  state = initialData;

  componentDidMount() {
    this.fetchColumns();
    this.fetchTasks();
  }

  componentWillUnmount() {
    columnsRef.off("value");
    tasksRef.off("value");
  }

  fetchColumns() {
    columnsRef.on("value", snapshot => {
      let columnsObj = snapshot.val();

      for (let key in columnsObj) {
        let columnObj = Object.assign({}, columnsObj[key]);

        for (let ckey in columnObj) {
          if (ckey === "taskIds") {
            const taskIdsObj = Object.assign({}, columnObj[ckey]);
            const taskIdsArray = Object.keys(taskIdsObj);

            columnObj.taskIds = taskIdsArray;
            columnsObj[key] = columnObj;
          }
        }
        
        if (columnObj.taskIds === undefined) {
          columnObj.taskIds = [];
          columnsObj[key] = columnObj;
        }
      }
      
      this.setState({ columns: columnsObj });
    });
  }

  fetchTasks() {
    tasksRef.on("value", snapshot => {
      const tasksObj = snapshot.val();
      
      this.setState({ tasks: tasksObj });
    });
  }

  updateColumns(columnsToUpdate, taskIds) {
    if (columnsToUpdate !== null) {
      for (let column in columnsToUpdate) {
        const columnTasks = columnsToUpdate[column].taskIds;
        let tasksToUpdate = {};
        
        columnTasks.forEach(taskId => {
          tasksToUpdate = {
            ...tasksToUpdate,
            [taskId]: true
          }
        })

        columnsToUpdate[column].taskIds = tasksToUpdate;
      }

      /*const columnTasks = columnToUpdate.taskIds;
      const filteredColumnTasks = columnTasks.filter(task => task !== taskIds[0]);
      
      let tasksToUpdate = {};
      
      filteredColumnTasks.forEach(taskId => {
        tasksToUpdate = {
          ...tasksToUpdate,
          [taskId]: true
        }
      });*/

      
      firebaseDb.ref(`columns`).set(columnsToUpdate);
    }
  }

  updateTask(taskId, locked) {
    if (taskId !== null) {
      firebaseDb.ref(`tasks/${taskId}`).update({
        locked: locked
      });
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    
    this.setState(newState);
    
    this.updateColumns(newState.columns);
  };

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map(columnId => {
            if (this.state.columns !== undefined && this.state.tasks !== undefined) {
              const column = this.state.columns[columnId];
              let tasks = [];
              if (column.taskIds !== undefined) {
                tasks = column.taskIds.map(
                  taskId => this.state.tasks[taskId]
                );
              }

              return <Column key={column.id} column={column} tasks={tasks} />;
            }
          })}
        </Container>
      </DragDropContext>
    );
  }
}
