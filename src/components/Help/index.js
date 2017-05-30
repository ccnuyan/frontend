import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import content from './Help.md';
import withStyles from '../../providers/stylesProvider';

class Help extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
  }
  render = () => {
    const { styles } = this.props;
    return (
      <div style={ styles.container }>
        <Paper style={ { padding: '3em', margin: '3em' } }>
          <div dangerouslySetInnerHTML={ { __html: content } } />
        </Paper>
      </div>
    );
  }
}

export default withStyles(Help);
