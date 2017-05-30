import { GraphQLObjectType } from 'graphql';
import ndf from '../nodeDefinitions';
import StoreType from './StoreType';

import dataService from '../dataService';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: ndf.nodeField,
    store: {
      type: StoreType,
      resolve: (obj, args, { req }) => {
        if (req.user) {
          /*
            authenticated, return req.user
            notice req.user is the logininfo and it has an id field
          */
          console.log({
            anonymous: false,
            loginInfo: req.user,
          });
          return {
            anonymous: false,
            loginInfo: req.user,
          };
        }
        // not authenticated, return anonymousLoginInfo
        return dataService.anonymousStore;
      },
    },
  }),
});

export default QueryType;
