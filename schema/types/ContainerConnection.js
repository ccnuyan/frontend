/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLID } from 'graphql';
import { globalIdField, mutationWithClientMutationId, connectionDefinitions, connectionArgs, connectionFromPromisedArray, connectionFromArray } from 'graphql-relay';
/* eslint-enable */

import ContainerType from './ContainerType';
import Container from '../models/Container';
import container from '../../db/services/container';

// return_id bigint,
// email varchar(255),
// display_name varchar(50),
// success boolean,
// message varchar(50)

const definition = connectionDefinitions({
  name: 'tenantContainers',
  nodeType: ContainerType,
});

const connection = {
  type: definition.connectionType,
  args: connectionArgs,
  resolve: (obj, args, { pPool, req }) => {
    if (!req.user) {
      return connectionFromArray([], args);
    }
    if (obj.tenantDetail.id === 0) {
      return connectionFromArray([], args);
    }
    return connectionFromPromisedArray(container.get_tenant_containers(pPool, {
      uid: req.user.id,
      tid: obj.tenantDetail.id,
    }).then((dbres) => {
      const uobj = dbres.rows.map(c => new Container(c));
      return uobj;
    }), args);
  },
};

export default {
  definition,
  connection,
};
