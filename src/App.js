import "./App.css";
import { TodoList } from "./List";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import { TaskDetailsModal } from "./Details";
import { TaskFormModal } from "./TaskForm";
import { useState, useCallback } from "react";

function App() {
  const [deatilsIsOpen, changeDetailsIsOpen] = useState(false);
  const [selectedTask, changeSelectedTask] = useState({});
  const [formIsOpen, changeFormIsOpen] = useState(false);

  const updateSelectedTask = useCallback((task) => {
    changeSelectedTask(task);
    changeDetailsIsOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
      changeFormIsOpen(false);
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h2>Task Manager</h2>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => changeFormIsOpen(true)}
        >
          Add
        </Button>
      </div>
      <TodoList addSelectedTask={updateSelectedTask} />
      <TaskDetailsModal
        selectedTask={selectedTask}
        isOpen={deatilsIsOpen}
        handleClose={() => changeDetailsIsOpen(false)}
      />
      <Dialog open={formIsOpen} onClose={handleFormClose}>
        <TaskFormModal onCloseCLick={handleFormClose} />
      </Dialog>
    </div>
  );
}

export default App;
