import React from 'react';

export const initialValue = {
  isError: false,
  errorMessage: '',
};

export const Context = React.createContext(initialValue);
export const useContext = React.useContext;
