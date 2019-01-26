import React, { Component } from 'react';
import Header from './Header';

export default class Basic extends Component {
  state ={
    name: 'rahul',
  }
  render() {
    return (
      <div>
        <Header />
        <div >
          {this.state.name}
        </div>
      </div>
    );
  }
}
