import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  InputLabel,
  NativeSelect,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todo";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const TaskFormModal = ({ onCloseCLick }) => {
  const formMethods = useForm();
  const disptach = useDispatch();
  const onSubmit = formMethods.handleSubmit((data) => {
    disptach(
      addTodo({
        ...data,
        id: "_" + Math.random().toString(36).substr(2, 9),
      })
    );
    onCloseCLick();
  });
  const classes = useStyles();

  const startDate = formMethods.watch("startingDate");

  return (
    <>
      <DialogTitle>Login</DialogTitle>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <DialogContent dividers={true}>
            <FormControl fullWidth margin="normal">
              <Controller
                as={TextField}
                control={formMethods.control}
                name="title"
                rules={{
                  required: "Title is required",
                  validate: (val) =>
                    val.length < 3 ? "Title length must be more than 3" : null,
                }}
                fullWidth
                error={!!formMethods.errors?.title?.message}
                helperText={formMethods.errors?.title?.message || null}
                variant={"outlined"}
                label="Title"
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                as={TextField}
                control={formMethods.control}
                name="description"
                rules={{
                  required: "Description is required",
                  validate: (val) =>
                    val.length < 20
                      ? "Description length must be more than 20"
                      : null,
                }}
                fullWidth
                error={!!formMethods.errors?.description?.message}
                helperText={formMethods.errors?.description?.message || null}
                variant={"outlined"}
                label="Description"
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                as={TextField}
                control={formMethods.control}
                name="startingDate"
                rules={{
                  required: "Start Date is required",
                }}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: moment().format("YYYY-MM-DD"),
                }}
                fullWidth
                error={!!formMethods.errors?.startingDate?.message}
                helperText={formMethods.errors?.startingDate?.message || null}
                variant={"outlined"}
                label="Start Date"
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                as={TextField}
                control={formMethods.control}
                name="deadline"
                rules={{
                  required: "Deadline is required",
                  validate: (val) =>
                    !moment(val).isAfter(startDate)
                      ? "Deadline must be after Start Date"
                      : null,
                }}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: moment(startDate).add("day", 1).format("YYYY-MM-DD"),
                }}
                fullWidth
                error={!!formMethods.errors?.deadline?.message}
                helperText={formMethods.errors?.deadline?.message || null}
                variant={"outlined"}
                label="Deadline"
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel shrink htmlFor="assignee">
                Assignee
              </InputLabel>
              <Controller
                render={(props) => (
                  <NativeSelect
                    className={classes.selectEmpty}
                    value={props.value}
                    name="assignee"
                    onChange={props.onChange}
                    fullWidth
                    error={!!formMethods.errors?.assignee?.message}
                    helperText={formMethods.errors?.assignee?.message || null}
                    variant={"outlined"}
                    required={true}
                    inputProps={{
                      id: "assignee",
                    }}
                  >
                    <option value="" disabled>
                      Select Assignee
                    </option>
                    <option value="Mahabbat Huseynov">Mahabbat Huseynov</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Doe John">Doe John</option>
                  </NativeSelect>
                )}
                control={formMethods.control}
                name="assignee"
                rules={{
                  required: "Assignee is required",
                }}
                defaultValue=""
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel shrink htmlFor="assignee">
                Priority
              </InputLabel>
              <Controller
                render={(props) => (
                  <NativeSelect
                    className={classes.selectEmpty}
                    value={props.value}
                    name="priority"
                    onChange={props.onChange}
                    fullWidth
                    error={!!formMethods.errors?.priority?.message}
                    helperText={formMethods.errors?.priority?.message || null}
                    variant={"outlined"}
                    required={true}
                    inputProps={{
                      id: "priority",
                    }}
                  >
                    <option value="" disabled>
                      Select Priority
                    </option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </NativeSelect>
                )}
                control={formMethods.control}
                name="priority"
                rules={{
                  required: "Priority is required",
                }}
                defaultValue=""
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel shrink htmlFor="assignee">
                Status
              </InputLabel>
              <Controller
                render={(props) => (
                  <NativeSelect
                    className={classes.selectEmpty}
                    value={props.value}
                    name="status"
                    onChange={props.onChange}
                    fullWidth
                    error={!!formMethods.errors?.status?.message}
                    helperText={formMethods.errors?.status?.message || null}
                    variant={"outlined"}
                    required={true}
                    inputProps={{
                      id: "status",
                    }}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </NativeSelect>
                )}
                control={formMethods.control}
                name="status"
                rules={{
                  required: "Status is required",
                }}
                defaultValue=""
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={onCloseCLick}>
              Close
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </>
  );
};
