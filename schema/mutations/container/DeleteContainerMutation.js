/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import container from '../../../db/services/container';
import tenantChannels from '../../types/ContainerConnection';

import TenantType from '../../types/TenantType';
import ContainerType from '../../types/ContainerType';


export default mutationWithClientMutationId({
  name: 'DeleteChannel',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tenant_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    containerEdge: {
      type: tenantChannels.definition.edgeType,
      resolve: (res) => {
        const ret = {
          node: res.rows[0],
          cursor: res.rows[0].id,
        };
        return ret;
      },
    },
    activeTenant: {
      type: TenantType,
    },
    activeChannel: {
      type: ContainerType,
    },
  },
  mutateAndGetPayload: ({ id, tenant_id }, { pPool, req }) => {
    return container.delete_container(pPool, {
      uid: req.user.id,
      tid: tenant_id,
      id,
    });
  },
});
