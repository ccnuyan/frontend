/* eslint-disable */
import { GraphQLSchema, GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import ndf from '../nodeDefinitions';
import { registerType } from '../typeRegistry';
import Tenant from '../models/Tenant';
import tenant from '../../db/services/tenant';
import ContainerConnection from './ContainerConnection';

const TenantType = new GraphQLObjectType({
  name: 'Tenant',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    username: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    containers: ContainerConnection.connection,
  }),
  interfaces: () => [ndf.nodeInterface],
});

export const fabricator = (tm) => {
  if (!tm || !tm.id) {
    return new Tenant({
      id: 0,
    });
  }
  return new Tenant(tm);
};

registerType(Tenant, TenantType, (id, { pPool }) => {
  return tenant.get_tenant_by_id(pPool, {
    id,
  }).then(res => fabricator(res.rows[0]));
});

export default TenantType;
