import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';


class ContentSwitcher extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }
  render = () => {
    const { store, match } = this.props;
    console.log(match.params.action);
    if (match.params.action === 'register') {
      return <RegisterCard store={ store }></RegisterCard>;
    }
    if (match.params.action === 'login') {
      return <LoginCard store={ store }></LoginCard>;
    }
    return <div>OK</div>;
  };
}

export default withRouter(ContentSwitcher);
