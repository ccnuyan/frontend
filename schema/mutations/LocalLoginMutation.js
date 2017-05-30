/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import StoreType from '../types/StoreType';
import dataService from '../dataService';

export default mutationWithClientMutationId({
  name: 'LocalLogin',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    store: {
      type: StoreType,
      resolve: (data) => {
        return data;
      },
    },
  },
  mutateAndGetPayload: async ({ username, password, mode }, { req, pPool }) => {
    if (mode === 'logout') {
      return dataService.anonymousStore;
    }
    const authRet = await pPool
      .query('select * from membership.authenticate($1, $2)', [username, password])
      .then(res => res.rows[0]);
    let user = {};

    if (authRet.success) {
      user = authRet;
      user.token = await pPool
        .query('select provider_token from membership.logins where membership.logins.user_id=$1 and membership.logins.provider=$2', [user.id, 'token'])
        .then(res => res.rows[0].provider_token);
      req.user = user; // eslint-disable-line
    }
    return {
      anonymous: false,
      loginInfo: user,
    };
  },
});
