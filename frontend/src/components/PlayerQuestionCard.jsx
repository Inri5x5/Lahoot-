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
      { props.mediaType === 'video' &&
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <iframe
            maxHeight='50vh'
            maxWeight= '50vw'
            src={props.attachment}
            frameBorder="0"
            allowFullScreen
            allow="autoPlay"
            style={{ margin: '25px 10px' }}
          ></iframe>
        </div>
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.questionName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Points: {props.points}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(props.questionType === 'singleChoice' ? 'Pick one of the answers' : 'Pick 2 or more from the answers')}
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
  questionType: PropTypes.string,
}
