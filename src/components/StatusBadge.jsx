import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { getStatusColor, getStatusText } from "../utils";
import clsx from "classnames";

const useStyles = makeStyles({
  box: {
    color: "white",
    padding: 10,
    maxWidth: 100,
    textAlign: "center",
  },
});

export const TaskStatusBadge = ({ status, className }) => {
  const classes = useStyles();
  return (
    <Box
      position="center"
      className={clsx(classes.box, className)}
      borderRadius={10}
      bgcolor={getStatusColor(status)}
    >
      {getStatusText(status)}
    </Box>
  );
};
