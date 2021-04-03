import _ from "lodash";
import moment from "moment";

export const getStatusColor = (status) => {
  if (status === "IN_PROGRESS") {
    return "warning.main";
  } else if (status === "DONE") {
    return "success.main";
  } else {
    return "primary.main";
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
    case "TODO":
      return "To Do";
    default:
      throw new Error("unknown status");
  }
};

export const getPriorityColor = (priority) => {
  if (priority === "LOW") {
    return "text.disabled";
  } else if (priority === "HIGH") {
    return "error.main";
  } else {
    return "info.main";
  }
};

export const sortWithDate = (arr, fieldName, direction) =>
  _.orderBy(arr, (x) => moment(x[fieldName]), [direction]);

export const sortWithTaskStatus = (arr, direction) => {
  const statuses = {
    TODO: 0,
    IN_PROGRESS: 1,
    DONE: 2,
  };

  if (direction === "asc") {
    return arr.sort((a, b) => statuses[a.status] - statuses[b.status]);
  }

  if (direction === "desc") {
    return arr.sort((a, b) => statuses[b.status] - statuses[a.status]);
  }
};

export const sortWithPriority = (arr, direction) => {
  const priorities = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
  };

  if (direction === "asc") {
    return arr.sort((a, b) => priorities[a.priority] - priorities[b.priority]);
  }

  if (direction === "desc") {
    return arr.sort((a, b) => priorities[b.priority] - priorities[a.priority]);
  }
};

export const sortTodoList = (arr, fieldName, direction) => {
  if (fieldName === "status") {
    return sortWithTaskStatus(arr, direction);
  } else if (fieldName === "priority") {
    return sortWithPriority(arr, direction);
  } else if (fieldName === "startingDate" || fieldName === "deadline") {
    return sortWithDate(arr, fieldName, direction);
  }
  return arr;
};
