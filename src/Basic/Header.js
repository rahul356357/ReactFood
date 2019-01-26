import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderComponent = styled.div`
height:50px;
width:100%;
display:flex;
background-color:'red';
`;

const SearchBar = styled.input.attrs({
  type: 'text',
})`
height:40px;
justify-content:center;
align-self: center;
`;

export default class Header extends Component {
    state = {

    }
    render() {
      return (
        <HeaderComponent >
          <SearchBar />
        </HeaderComponent>
      );
    }
}
