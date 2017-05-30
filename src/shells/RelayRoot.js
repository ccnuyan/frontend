import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Environment, Network, Store, RecordSource } from 'relay-runtime';
import { QueryRenderer, graphql } from 'react-relay';

import withStyles from '../providers/stylesProvider';
import ClientRouter from './ClientRouter';
import { getLocalToken } from '../core/tokenUtil';

class RelayRoot extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
  }

  getStyles = () => {
    const { styles } = this.props;
    return {
      container: {
        ...styles.flexColumn,
        ...styles.flexBetweenStretch,
      },
    };
  }

  getEnvironment = () => {
    const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
      /* eslint-disable no-console */
      console.group('fetchQuery'); //
      console.log(operation);
      console.log(variables);
      console.log(cacheConfig);
      console.log(uploadables);
      console.groupEnd();
      /* eslint-disable no-console */

      return fetch('/graphql', {
        method: 'POST',
        headers: {
          referer: `/graphql?query=${encodeURIComponent(operation.text)}`,
          'content-type': 'application/json',
          authorization: `bearer ${getLocalToken()}`,
        }, // Add authentication and other headers here
        body: JSON.stringify({
          operationName: operation.name,
          query: operation.text, // GraphQL text from input
          variables,
        }),
      }).then((response) => {
        return response.json();
      });
    };
    return new Environment({
      handlerProvider: null,
      store: new Store(new RecordSource()),
      network: Network.create(fetchQuery),
    });
  }

  queryRender = ({ error, props }) => {
    const styles = this.getStyles();
    if (error) {
      return <div style={ styles.container }>{error.message}</div>;
    } else if (props) {
      return <ClientRouter store={ props.store }></ClientRouter>;
    }
    return <div>Loading</div>;
  }

  rootQuery = () => {
    return graphql`
          query RelayRoot_Query{
            store{
              ...ClientRouter_store
            }
          }
        `;
  }

  render = () => {
    return (
      <QueryRenderer environment={ this.getEnvironment() }
        query={ this.rootQuery() }
        render={ this.queryRender }
      >
      </QueryRenderer>
    );
  }
}

export default withStyles(RelayRoot);
