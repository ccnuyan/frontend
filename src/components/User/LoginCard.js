import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';
import { createFragmentContainer, graphql } from 'react-relay';

import withStyles from '../../providers/stylesProvider';
import mutations from '../../mutations';
import { setLocalToken } from '../../core/tokenUtil';


class LoginCard extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }

  getStyles = () => {
    const { styles } = this.props;
    return {
      card: {
        padding: '3em',
        margin: '3em',
      },
      buttonBox: {
        ...styles.flexRow,
        ...styles.flexBetweenStretch,
      },
    };
  }

  onLogin = () => {
    mutations.LocalLoginMutation.commit(
      this.props.relay.environment,
      {
        store: this.props.store,
      },
      {
        username: this.unInput.input.value || 'ccnuyan',
        password: this.pwInput.input.value || 'password',
        mode: 'login',
      },
      {
        onCompleted: (p) => {
          const info = p.localLogin.store.loginInfo;
          if (info.success) {
            setLocalToken(info.token);
          }
        },
      },
    );
  }

  render = () => {
    const styles = this.getStyles();
    return (
      <Paper style={ styles.card }>
        <h1>Login</h1>
        <TextField
          ref={ (c) => { this.unInput = c; } }
          floatingLabelText="Username"
          floatingLabelFixed={ true }
        />
        <br />
        <TextField
          ref={ (c) => { this.pwInput = c; } }
          floatingLabelText="Password"
          type="password"
          floatingLabelFixed={ true }
        />
        <br />
        <div style={ styles.buttonBox }>
          <RaisedButton primary onTouchTap={ this.onLogin } label={ 'OK' }></RaisedButton>
          <FlatButton label={ 'Register' } onTouchTap={ () => this.props.history.push('/user/register') }></FlatButton>
        </div>
      </Paper>
    );
  }
}

export default createFragmentContainer(withStyles(withRouter(LoginCard)),
  graphql`
    fragment LoginCard_store on Store{
      anonymous
      anonymousInfo{
        message
      }
    }
  `,
);
