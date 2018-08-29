import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActionCreators from './authActionCreators';

const Login = () => (
  <div>
    <h1>Hello Test</h1>
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
