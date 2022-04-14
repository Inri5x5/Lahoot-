import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, } from '@mui/material';
import { fileToDataUrl } from '../helper-func.js';

export default function editQuizDialog (props) {
  const [updateName, setNewName] = React.useState('');
  const [quizThumbnail, setQuizThumbnail] = React.useState('');

  const updateQuizThumbnail = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file)
      .then((res) => {
        setQuizThumbnail(res);
      })
  }

  return (
    <Dialog PaperProps={{ sx: { width: '45%', height: '35%' } }}
      open={props.openEdit} onClose={props.onClose}>
      <DialogTitle>Edit your Quiz</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setNewName(e.target.value) }
        />
        <div>
          <Button
            variant= "contained"
            component= "label"
          >
            Upload Thumbnail
            <input
              type= "file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={updateQuizThumbnail}
            />
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.quizInfoUpdate(updateName, quizThumbnail)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
