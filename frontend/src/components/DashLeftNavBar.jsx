import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import styles from '../styles/DashLeftStyle.module.css'
import { APICall } from '../apiCall';

function DashLeftNavBar () {
  const [open, setOpen] = React.useState(false);
  const [quizName, setName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addQuiz = async (name) => {
    if (!quizName.trim()) {
      alert('Be Creative and Enter a name!')
      return
    }
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
    <div className={styles.fill}>
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
      <Dialog PaperProps={{ sx: { width: '45%', height: '30%' } }}
        open={open} onClose={handleClose}>
        <DialogTitle>Give Your Quiz a Name!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addQuiz(quizName)} >Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashLeftNavBar;
