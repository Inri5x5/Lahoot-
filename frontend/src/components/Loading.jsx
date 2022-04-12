import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const LoadingWrapper = styled('div')({
  margin: '0 auto',
  marginTop: '10%',
  width: '300px',
  textAlign: 'center',
});

const Loading = () => {
  const [error, setError] = React.useState(false);
  setTimeout(() => setError(true), 10000);
  return (
    <LoadingWrapper>
      {!error && (
        <CircularProgress color="inherit" />
      )}
      {error && (
        <i>Sorry, please try again later.</i>
      )}
    </LoadingWrapper>
  );
}

export default Loading;
