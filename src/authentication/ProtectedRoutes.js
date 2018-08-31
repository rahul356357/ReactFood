import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const ProtectedRoutes = ({ Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={() => (
      <Component {...rest} />
    )}
  />
);

ProtectedRoutes.propTypes = {
  Component: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default ProtectedRoutes;
