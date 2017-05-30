/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLID } from 'graphql';
import { globalIdField, mutationWithClientMutationId, connectionDefinitions, connectionArgs, connectionFromPromisedArray, connectionFromArray } from 'graphql-relay';
/* eslint-enable */

import TenantType from './TenantType';
import Tenant from '../models/Tenant';
import tenant from '../../db/services/tenant';

// return_id bigint,
// email varchar(255),
// display_name varchar(50),
// success boolean,
// message varchar(50)

const definition = connectionDefinitions({
  name: 'tenants',
  nodeType: TenantType,
});

const connection = {
  type: definition.connectionType,
  args: connectionArgs,
  resolve: (_, args, { pPool, req }) => {
    if (!req.user) {
      return connectionFromArray([], args);
    }
    return connectionFromPromisedArray(tenant.get_all_tenants(pPool, {
      uid: req.user.id,
    }).then((dbres) => {
      const uobj = dbres.rows.map(c => new Tenant(c));
      return uobj;
    }), args);
  },
};

export default {
  definition,
  connection,
};
