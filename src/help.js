import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './includes';

import withStyles from './providers/stylesProvider';
import RelayRoot from './shells/RelayRoot';
import './style.scss';

class Root extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  }
  render = () => {
    return (
      <MuiThemeProvider muiTheme={ this.props.theme }>
        <RelayRoot/>
      </MuiThemeProvider>
    );
  }
}

const RootComponent = withStyles(Root);
const rootNode = document.getElementById('react');
ReactDOM.render(<RootComponent />, rootNode);
