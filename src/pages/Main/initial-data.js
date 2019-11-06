const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Choose Database" },
    "task-2": {
      id: "task-2",
      content: "Establish connection between server and client"
    },
    "task-3": {
      id: "task-3",
      content: "Plan frontend structure for DND component"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3"]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },

  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
