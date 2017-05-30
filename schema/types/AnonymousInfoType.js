/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLID } from 'graphql';
import { globalIdField, mutationWithClientMutationId, connectionDefinitions, connectionArgs, connectionFromPromisedArray, connectionFromArray } from 'graphql-relay';
/* eslint-enable */

export default new GraphQLObjectType({
  name: 'AnonymousInfo',
  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: (_1, _2, { req }) => {
        if (req.user) {
          return '';
        }
        return 'welcome, join in to enjoy';
      },
    },
  }),
});
