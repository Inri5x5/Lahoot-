import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function PlayerQuestionCard (props) {
  return (
    <Card style={{ width: '80%' }} sx={{ m: 2 }}>
      { props.mediaType === 'image' &&
        <CardMedia
          component="img"
          sx={{ maxHeight: '50vh', maxWeight: '50vw' }}
          image={props.attachment}
          alt="question thumbnail"
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.questionName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Points: {props.points}
        </Typography>
      </CardContent>
    </Card>
  );
}

PlayerQuestionCard.propTypes = {
  questionName: PropTypes.string,
  points: PropTypes.number,
  mediaType: PropTypes.string,
  attachment: PropTypes.string,
}
