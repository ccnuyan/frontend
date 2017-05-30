import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import {
  Route,
} from 'react-router-dom';

import withStyles from '../../providers/stylesProvider';

import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';

class User extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }

  render = () => {
    const { styles, store, match } = this.props;
    return (
      <div style={ styles.container }>
        {/* (!this.props.store.anonymous ?
              (<Redirect to={ { pathname: '/home' } }></Redirect>) :
              (<User location={ props.location } store={ this.props.store }></User>))*/}
        <Route path={ `${match.url}/register` } component={ () => <RegisterCard store={ store }></RegisterCard> }></Route>
        <Route path={ `${match.url}/login` } component={ () => <LoginCard store={ store }></LoginCard> }></Route>
      </div>
    );
  }
}

export default createFragmentContainer(withStyles(withRouter(User)),
  graphql`
    fragment User_store on Store{
      anonymous
      anonymousInfo{
        message
      }
      ...LoginCard_store
      ...RegisterCard_store
    }
  `,
);

