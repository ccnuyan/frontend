import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { clearToken } from '../../core/tokenUtil';

import { getLocalThemeKey, setLocalThemeKey } from '../../core/themeUtil';
import withStyles from '../../providers/stylesProvider';

class Header extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  }

  state = {
    themes: [
      { themeKey: 'Dark', themeValue: '' },
      { themeKey: 'Light', themeValue: '' },
    ],
    currentTheme: '',
  }

  componentDidMount = () => {
    this.setState({ currentTheme: getLocalThemeKey() });
  }

  handleThemeChange = (event, index, value) => {
    setLocalThemeKey(value);
    window.location.reload();
  };

  logout = () => {
    clearToken();
    window.location.reload();
  }

  getStyles = () => {
    const { styles } = this.props;
    return {
      navLink: {
        active: {
          ...styles.active,
          margin: '0.5em 1em',
          padding: '0.5em 1em',
          textDecoration: 'none',
        },
        plain: {
          ...styles.plain,
          margin: '0.5em 1em',
          padding: '0.5em 1em',
          textDecoration: 'none',
        },
      },
    };
  }

  render = () => {
    const styles = this.getStyles();
    return (
      <Toolbar style={ { flex: '0 0 auto' } }>
        <ToolbarGroup>
          <ToolbarTitle text="Frontend" onTouchTap ={ () => this.props.history.push('/home') } />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          {this.props.store.anonymous ?
            '' :
            <NavLink to='/user' style={ styles.navLink.plain } activeStyle={ styles.navLink.active }>
              {this.props.store.loginInfo.username}
            </NavLink>
            }
          {this.props.store.anonymous ?
            <NavLink to='/user/login' style={ styles.navLink.plain } activeStyle={ styles.navLink.active }>Login</NavLink> :
            ''}
          <NavLink to='/help' style={ styles.navLink.plain } activeStyle={ styles.navLink.active }>Help</NavLink>
          <ToolbarSeparator></ToolbarSeparator>
          {this.props.store.anonymous ?
            '' :
            <a onTouchTap ={ this.logout } style={ { ...styles.navLink.active, cursor: 'pointer' } }>Logout</a>}
          <DropDownMenu value={ this.state.currentTheme } onChange={ this.handleThemeChange }>
            { this.state.themes.map(p => <MenuItem key={ p.themeKey } value={ p.themeKey } primaryText={ p.themeKey } />)}
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default createFragmentContainer(withRouter(withStyles(Header)),
  graphql`
    fragment Header_store on Store{
      anonymous
      loginInfo{
        username
      }
    }
  `,
);
