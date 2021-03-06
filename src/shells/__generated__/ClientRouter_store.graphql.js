/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule ClientRouter_store.graphql
 * @generated SignedSource<<e388ecabd2f299972e745532802cf963>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ClientRouter_store = {|
  +anonymous: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClientRouter_store",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "anonymous",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Home_store",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "User_store",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Header_store",
      "args": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
