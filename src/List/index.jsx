import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Paper,
  TableRow,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableSortLabel,
} from "@material-ui/core";
import { sortTodoList } from "../utils";
import moment from "moment";
import { TaskStatusBadge } from "../components/StatusBadge";
import { TaskPriorityBadge } from "../components/PriorityBadge";
import { DATE_FORMAT } from "../consts";
import { updateTodoList } from "../actions/todo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: "pointer",
  },
  box: {
    margin: "0 auto",
  },
}));

export const TodoList = ({ addSelectedTask }) => {
  const classes = useStyles();
  const [sortBy, changeSortBy] = useState("status");
  const [direction, changeDirection] = useState("asc");
  const todoList = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();

  const handleSort = (fieldName) => {
    if (fieldName === sortBy) {
      const newDirection = direction === "asc" ? "desc" : "asc";
      dispatch(updateTodoList(sortTodoList(todoList, fieldName, newDirection)));
      changeDirection(newDirection);
    } else {
      dispatch(updateTodoList(sortTodoList(todoList, fieldName, "asc")));
      changeSortBy(fieldName);
      changeDirection("asc");
    }
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell width={150}>Title</TableCell>
            <TableCell width={400}>Description</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "startingDate"}
                direction={direction}
                onClick={() => handleSort("startingDate")}
              >
                Start Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "deadline"}
                direction={direction}
                onClick={() => handleSort("deadline")}
              >
                Deadline
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortBy === "priority"}
                direction={direction}
                onClick={() => handleSort("priority")}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortBy === "status"}
                direction={direction}
                onClick={() => handleSort("status")}
              >
                Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow
              key={index}
              onClick={() => addSelectedTask(todo)}
              className={classes.tableRow}
            >
              <TableCell component="th" scope="row">
                {todo.title}
              </TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                {moment(todo.startingDate).format(DATE_FORMAT)}
              </TableCell>
              <TableCell>{moment(todo.deadline).format(DATE_FORMAT)}</TableCell>
              <TableCell align="center">
                <TaskPriorityBadge
                  priority={todo.priority}
                  className={classes.box}
                />
              </TableCell>
              <TableCell align="center">
                <TaskStatusBadge status={todo.status} className={classes.box} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TodoList.propTypes = {
  addSelectedTask: PropTypes.func.isRequired,
};
