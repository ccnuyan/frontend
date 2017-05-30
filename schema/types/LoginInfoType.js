/* eslint-disable */
import { GraphQLSchema, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

export default new GraphQLObjectType({
  name: 'LoginInfo',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
    success: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
    },
  }),
});
