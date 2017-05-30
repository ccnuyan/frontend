import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../components/common/Header';
import Home from '../components/Home';
import User from '../components/User';
import Help from '../components/Help';

// https://reacttraining.com/react-router/web/guides/quick-start
class ClientRouter extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render = () => {
    return (
      <Router>
        <div>
          {/* inject property location for auto updating
            https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
            */}
          <Route exact path='/*' component={ props => <Header location={ props.location } store={ this.props.store }></Header> }></Route>
          <Switch>
            <Route exact path='/' component={ () => <Home store={ this.props.store }></Home> }></Route>
            <Route path='/home' component={ () => <Home store={ this.props.store }></Home> }></Route>
            <Route path='/user' component={ props => <User location={ props.location } store={ this.props.store }></User> }></Route>
            <Route path='/help' component={ () => <Help store={ this.props.store }></Help> }></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default createFragmentContainer(ClientRouter,
    graphql`
    fragment ClientRouter_store on Store{
      anonymous
      ...Home_store
      ...User_store
      ...Header_store
    }
  `,
);
