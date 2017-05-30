/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import container from '../../db/services/container';
import tenant from '../../db/services/tenant';

import { fabricator as acnFab } from '../types/ContainerType';
import { fabricator as atmFab } from '../types/TenantType';

import StoreType from '../types/StoreType';


export default mutationWithClientMutationId({
  name: 'SetActiveContainer',
  inputFields: {
    tenant_id: {
      type: GraphQLString,
    },
    container_id: {
      type: GraphQLString,
    },
  },
  outputFields: {
    store: {
      type: StoreType,
      resolve: (res) => {
        return res;
      },
    },
  },
  mutateAndGetPayload: async ({ tenant_id, container_id }, { req, pPool }) => {
    if (!req.user) {
      return {
        activeTeam: atmFab(),
        activeContainer: acnFab(),
      };
    }

    let ac;
    let at;

    if (container_id) {
      ac = await container.get_container_by_id(pPool, {
        id: container_id,
      }).then(res => res.rows[0]);

      at = await tenant.get_tenant_by_id(pPool, {
        id: ac.tenant_id,
      }).then(res => atmFab(res.rows[0]));
    } else if (tenant_id) {
      ac = tenant.get_last_visit_tenant_container(pPool, {
        uid: req.user.id,
        tid: tenant_id,
      }).then(res => res.rows[0]);

      at = await tenant.get_tenant_by_id(pPool, {
        id: tenant_id,
      }).then(res => atmFab(res.rows[0]));
    } else {
      at = await tenant.get_last_visit_tenant(pPool, {
        uid: req.user.id,
      }).then(res => atmFab(res.rows[0]));

      ac = await tenant.get_last_visit_tenant_container(pPool, {
        uid: req.user.id,
        tid: at.id,
      }).then(res => res.rows[0]);
    }

    return {
      activeTeam: { id: at.id },
      activeContainer: { id: ac.id },
    };
  },
});
