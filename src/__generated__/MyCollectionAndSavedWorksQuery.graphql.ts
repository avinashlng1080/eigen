/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash ccfb597f7b828563e39131626d86ba42 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionAndSavedWorksQueryVariables = {};
export type MyCollectionAndSavedWorksQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionAndSavedWorks_me">;
    } | null;
};
export type MyCollectionAndSavedWorksQuery = {
    readonly response: MyCollectionAndSavedWorksQueryResponse;
    readonly variables: MyCollectionAndSavedWorksQueryVariables;
};



/*
query MyCollectionAndSavedWorksQuery {
  me @optionalField {
    ...MyCollectionAndSavedWorks_me
    id
  }
}

fragment MyCollectionAndSavedWorks_me on Me {
  name
  createdAt
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionAndSavedWorksQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionAndSavedWorks_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionAndSavedWorksQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ccfb597f7b828563e39131626d86ba42",
    "metadata": {},
    "name": "MyCollectionAndSavedWorksQuery",
    "operationKind": "query",
    "text": null
  }
};
(node as any).hash = 'e2528a0edab35bb34cd3e89a63547d21';
export default node;