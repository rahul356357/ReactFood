import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Basic from '../Basic/Basic';

class AppRouter extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Basic} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(AppRouter);
