import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../authentication/Login';

class AppRouter extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(AppRouter);
