import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Select,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TaskPriorityBadge } from "../components/PriorityBadge";
import moment from "moment";
import { DATE_FORMAT } from "../consts";
import { useDispatch } from "react-redux";
import { updateTodo } from "../actions/todo";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  box: {
    marginTop: 16,
  },
  selectBox: {
    minWidth: 220,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  list: {
    paddingLeft: 25,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TaskDetailsModal = ({ isOpen, handleClose, selectedTask }) => {
  const classes = useStyles();
  const [status, changeStatus] = useState(selectedTask.status);

  const dispatch = useDispatch();

  const onStatusChange = (event) => {
    changeStatus(event.target.value);

    dispatch(updateTodo({ ...selectedTask, status: event.target.value }));
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {selectedTask.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <List className={classes.list}>
        <ListItem>
          <ListItemText
            primary="Description"
            secondary={selectedTask.description}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Assignee" secondary={selectedTask.assignee} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Start Date"
            secondary={moment(selectedTask.startingDate).format(DATE_FORMAT)}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Deadline"
            secondary={moment(selectedTask.deadline).format(DATE_FORMAT)}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Priority"
            secondary={
              <TaskPriorityBadge
                priority={selectedTask.priority}
                className={classes.box}
              />
            }
          />
        </ListItem>
        <ListItem style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <ListItemText primary="Status" />
          <Select
            className={classes.selectBox}
            value={status || selectedTask.status}
            onChange={onStatusChange}
          >
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
        </ListItem>
      </List>
    </Dialog>
  );
};

TaskDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    startingDate: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
