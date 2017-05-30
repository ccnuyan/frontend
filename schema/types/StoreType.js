/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLObject, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import AnonymousInfoType from './AnonymousInfoType';
import LoginInfoType from './LoginInfoType';

import ndf from '../nodeDefinitions';

import TenantType, { getTenant } from './TenantType';

import tenants from './TenantConnection';

const StoreType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: globalIdField('Store'),
    anonymous: {
      type: GraphQLBoolean,
    },
    anonymousInfo: {
      type: AnonymousInfoType,
    },
    loginInfo: {
      type: LoginInfoType,
    },
    tenants: tenants.connection,
    activeTenant: {
      type: TenantType,
      resolve: (st, args, { pPool }) => {
        return st.activeTenant ? getTenant(pPool, st.activeTenant.id) : getTenant();
      },
    },
  }),
  interfaces: () => [ndf.nodeInterface],
});

export default StoreType;
