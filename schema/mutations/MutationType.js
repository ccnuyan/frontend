import { GraphQLObjectType } from 'graphql';

import LocalLoginMutation from './LocalLoginMutation';
import LocalRegisterMutation from './LocalRegisterMutation';

import CreateContainerMutation from './container/CreateContainerMutation';
import DeleteContainerMutation from './container/DeleteContainerMutation';
import UpdateContainerMutation from './container/UpdateContainerMutation';

import SetActiveContainerMutation from './SetActiveContainerMutation';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    localLogin: LocalLoginMutation,
    localRegister: LocalRegisterMutation,

    createContainer: CreateContainerMutation,
    deleteContainer: DeleteContainerMutation,
    updateContainer: UpdateContainerMutation,

    setActiveContainer: SetActiveContainerMutation,
  }),
});

export default MutationType;
