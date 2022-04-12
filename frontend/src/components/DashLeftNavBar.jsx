import * as React from 'react';
import {
  // AppBar,
  // Box,
  List,
  ListItem,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  // ListItemIcon,
  // ListItemText,
  // Toolbar,
  // Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import { useNavigate } from 'react-router-dom';
import styles from '../styles/DashLeftStyle.module.css'
import { APICall } from '../apiCall';

function DashLeftNavBar () {
  // const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [quizName, setName] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addQuiz = async (name) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      }
      const requestBody = {
        name: name,
      }
      const data = await APICall(requestBody, '/admin/quiz/new', 'POST', headers)
      if (data.error) {
        throw new Error(data.error);
      }
      handleClose();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <List className={styles.navContainer}>
        <ListItem>
          <ListItemButton onClick={handleClickOpen}>
            <span> <AddCircleOutlineIcon /> Add Game </span>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <span> <SportsEsportsIcon /> Join Game </span>
          </ListItemButton>
        </ListItem>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quiz Name:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name:"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addQuiz(quizName)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashLeftNavBar;
