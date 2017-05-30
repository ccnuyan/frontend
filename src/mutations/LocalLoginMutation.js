import { graphql, commitMutation } from 'relay-runtime';
// https://facebook.github.io/relay/docs/mutations.html
const mutation = graphql`
  mutation LocalLoginMutation($input: LocalLoginInput!){ 
    localLogin(input: $input) {
      store {
        anonymous
        anonymousInfo{
            message
        }
        loginInfo {
            id
            username
            role
            success
            message
            token
        }
      }
    } 
  }`;

const updater = (store) => {
  return [{
    type: 'FIELDS_CHANGE',
    fieldIDs: {
      store: store.id,
    },
  }];
};

const optimisticResponse = () => {
  const ret = {
    anonymous: false,
    anonymousInfo: {
      message: 'Logining',
    },
    loginInfo: {
      success: false,
      message: 'Logining',
    },
  };
  // here the result must be wrapped in mutation name
  return { localLogin: ret };
};

const commit = (environment, { store }, args, handlers) => {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: args,
      },
      optimisticResponse,
      updater,
      ...handlers,
    },
  );
};

export default { commit };
