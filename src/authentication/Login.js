import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActionCreators from './authActionCreators';

class Login extends React.Component {
  state = {} ;c

  render() {
    return (
      <div>
        <button> Login</button>
        <button>Login is</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
