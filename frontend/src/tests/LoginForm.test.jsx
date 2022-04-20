import { Alert } from '@mui/material';
import { render, shallow } from 'enzyme';
import React from 'react';
import LoginForm from '../components/LoginForm'
import LoginPage from '../pages/LoginPage'

describe('LoginForm Component', () => {
  const noop = () => {};

  it('Login Button is valid', () => {
    const login = shallow(<LoginForm />);
    expect(login.find('button').text()).toEqual('Login');
  });

  it('Email and Password is valid and empty at start', () => {
    const login = shallow(<LoginForm />);
    const emailInput = (login.find('input')).findWhere((node) => node.props().name === 'email');
    const passInput = (login.find('input')).findWhere((node) => node.props().name === 'password')
    
    /* Check if there is an input for email and password */
    expect(emailInput.exists()).toEqual(true);
    expect(passInput.exists()).toEqual(true);
    
    /* Check if the input is empty at start */
    expect(emailInput.props().value).toEqual('');
    expect(passInput.props().value).toEqual('');
  })

  it('Changing Email and Password value', () => {
    const login = shallow(<LoginForm />);
    let emailInput = (login.find('input')).findWhere((node) => node.props().name === 'email');
    let passInput = (login.find('input')).findWhere((node) => node.props().name === 'password');
    emailInput.simulate('change', { target: { value: 'emailTest'} });
    passInput.simulate('change', { target: { value: 'passTest' } });
    
    /* The value change after simulate change */
    login.update();
    emailInput = (login.find('input')).findWhere((node) => node.props().name === 'email');
    passInput = (login.find('input')).findWhere((node) => node.props().name === 'password');
    expect(emailInput.props().value).toEqual('emailTest');
    expect(passInput.props().value).toEqual('passTest');
  })

  it('Submit Email and Password', () => {
    const login = shallow(<LoginForm submit={noop} />);
    const btn = login.find('button')
    btn.simulate('click')
  })

})