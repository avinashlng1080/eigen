/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash cdc7d620ddabb553f261e309d40c600a */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyAccountQueryVariables = {};
export type MyAccountQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyAccount_me">;
    } | null;
};
export type MyAccountQuery = {
    readonly response: MyAccountQueryResponse;
    readonly variables: MyAccountQueryVariables;
};



/*
query MyAccountQuery {
  me {
    ...MyAccount_me
    id
  }
}

fragment MyAccount_me on Me {
  name
  email
  phone
  paddleNumber
  hasPassword
  authentications {
    provider
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyAccountQuery",
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
            "name": "MyAccount_me"
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
    "name": "MyAccountQuery",
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
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "paddleNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPassword",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationType",
            "kind": "LinkedField",
            "name": "authentications",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "provider",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "cdc7d620ddabb553f261e309d40c600a",
    "metadata": {},
    "name": "MyAccountQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '8f5885fed0c1869833b4ad7966725076';
export default node;
