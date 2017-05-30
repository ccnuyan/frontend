/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import container from '../../../db/services/container';
import teamContainers from '../../types/ContainerConnection';
import StoreType from '../../types/StoreType';
import dataService from '../../dataService';

export default mutationWithClientMutationId({
  name: 'CreateContainer',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    containerEdge: {
      type: teamContainers.definition.edgeType,
      resolve: (res) => {
        const ret = {
          node: res.rows[0],
          cursor: res.rows[0].id,
        };
        return ret;
      },
    },
    store: {
      type: StoreType,
      resolve: () => dataService.anonymousStore,
    },
  },
  mutateAndGetPayload: ({ title }, { pPool, req }) => {
    return container.create_container(pPool, {
      uid: req.user.id,
      title,
    });
  },
});
