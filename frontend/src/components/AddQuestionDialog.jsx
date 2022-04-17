import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import EditQuestionForm from './EditQuestionForm.jsx';

export default function AddQuestionDialog (props) {
  const uId = uuid();
  const afterModified = (allQuestions) => {
    props.addQuestion(allQuestions);
    props.onClose();
  }
  const newQuestion = {
    id: uId.slice(0, 8),
    question: '',
    timeLimit: 0,
    points: 0,
    questionType: 'singleChoice',
    mediaType: '',
    questionAttachment: '',
    answers: [{
      id: -1,
      answer: 'Sample Answer',
      correct: false,
    }, {
      id: -1,
      answer: 'Sample Answer',
      correct: false,
    }],
  }
  return (
    <Dialog PaperProps={{ sx: { width: '60%', height: '60%' } }}
      open={props.open} onClose={props.onClose}>
      <DialogContent>
        <EditQuestionForm
          isAdd={true}
          allQuestions={props.allQuestions}
          selectedQuestion={newQuestion}
          quizId={props.quizId}
          afterModified={afterModified}
          cancelModified={props.onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

AddQuestionDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  allQuestions: PropTypes.array,
  quizId: PropTypes.string,
  addQuestion: PropTypes.func,
}
