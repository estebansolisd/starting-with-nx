import React, { FormEvent, useState, MouseEvent, ChangeEvent } from 'react';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

//Icons
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

//Components
import AppBarComponent from '../components/appBar';

interface ITodo {
  id: number;
  title: string;
  date: string;
}

export default function Index() {
  const initTodo: ITodo = {
    date: '',
    id: -1,
    title: '',
  };
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<ITodo>(initTodo);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTodo.id !== -1) {
      console.log("Editing", currentTodo);

      setTodos(
        todos.map(
          (todo: ITodo) =>
            todo.id === currentTodo.id ? currentTodo : todo
        )
      );
    } else {
      console.log("New", currentTodo);
      setTodos([...todos, {...currentTodo, id: todos.length + 1}]);
    }
    setCurrentTodo(initTodo);
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    switch (e.currentTarget.dataset.el_name) {
      case 'btnDeleteTodo':
        setTodos(
          todos.filter(
            (todo: ITodo) =>
              todo.id !== Number(e.currentTarget.dataset.el_value)
          )
        );
        break;
      case 'btnEditTodo':
        let todoToModify: ITodo =
          JSON.parse(e.currentTarget.dataset.el_value || '') || initTodo;
        console.log(todoToModify);
        setCurrentTodo(todoToModify);
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    switch (e.target.name) {
      case 'title':
      case 'date':
        setCurrentTodo({
          ...currentTodo,
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBarComponent />
      </Grid>
      <Grid item xs={12} className="mt-56 p-10">
        <Grid container spacing={2}>
          <Grid item xs={12} md>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper className="p-10">
                  <form onSubmit={addTodo}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Add new TODO</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="title"
                          type="text"
                          value={currentTodo.title}
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="date"
                          type="date"
                          variant="outlined"
                          fullWidth
                          value={currentTodo.date}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Button variant="contained" fullWidth type="submit">
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md>
            <Paper className="p-10">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Available TODOS</Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {todos.map((todo: ITodo) => (
                      <ListItem key={`todo-id-${todo.id}`} role={undefined}>
                        <ListItemIcon>
                          <IconButton
                            onClick={handleClick}
                            data-el_name="btnEditTodo"
                            data-el_value={JSON.stringify(todo)}
                          >
                            <EditIcon />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          id={`todo-id-${todo.id}`}
                          primary={todo.title}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={handleClick}
                            data-el_name="btnDeleteTodo"
                            data-el_value={todo.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
