import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import WelcomeCard from './WelcomeCard';
import withStyles from '../../providers/stylesProvider';

class Home extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }
  render = () => {
    const { store, styles } = this.props;
    return (
      <div style={ styles.container }>
        <WelcomeCard store={ store }></WelcomeCard>
      </div>
    );
  }
}

export default createFragmentContainer(withStyles(withRouter(Home)),
  graphql`
    fragment Home_store on Store{
      anonymous
      anonymousInfo{
        message
      }
    }
  `,
);

