import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function PlayerAnswerButton (props) {
  return (
    <Button
      style={{ width: '80%' }}
      sx={{ mb: 1 }}
      onClick={ () => { props.submit(props.selectedAnswer.id) }}
      variant={(props.isSelected) ? 'contained' : 'outlined'}>
        { props.selectedAnswer.answer }
    </Button>
  );
}

PlayerAnswerButton.propTypes = {
  submit: PropTypes.func,
  selectedAnswer: PropTypes.object,
  isSelected: PropTypes.bool,
}
