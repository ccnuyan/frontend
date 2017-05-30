/* eslint-disable */
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputField, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField, nodeDefinitions, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
/* eslint-enable */

import container from '../../../db/services/container';
import ContainerType, { fabricator as chanFab } from '../../types/ContainerType';


export default mutationWithClientMutationId({
  name: 'UpdateContainer',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    team_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    container: {
      type: ContainerType,
      resolve: (res) => {
        return chanFab(res.rows[0]);
      },
    },
  },
  mutateAndGetPayload: ({ id, team_id, title }, { pPool, req }) => {
    return container.update_container_title(pPool, {
      uid: req.user.id,
      tid: team_id,
      id,
      title,
    });
  },
});
