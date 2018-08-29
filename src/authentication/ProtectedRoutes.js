import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import authService from './authService';

/*eslint-disable*/
const ProtectedRoutes = (props) => {
  const { component: Component, isAuthenticated, ...rest } = props;
  const userDetails = authService.getDetails();
  return (
    <Route
      {...rest}
      render={() => {
      if (userDetails.token) {
        return (<Component {...rest} />);
      }
       return (
         <Component {...rest} />
       );
    }}
    />
  );
};

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default ProtectedRoutes;
