/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash d6f92ff7b9230df729d4e3bd1270b735 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Show2TestsQueryVariables = {
    showID: string;
};
export type Show2TestsQueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"Show2_show">;
    } | null;
};
export type Show2TestsQuery = {
    readonly response: Show2TestsQueryResponse;
    readonly variables: Show2TestsQueryVariables;
};



/*
query Show2TestsQuery(
  $showID: String!
) {
  show(id: $showID) {
    ...Show2_show
    id
  }
}

fragment Show2Header_show on Show {
  name
  startAt
  endAt
  formattedStartAt: startAt(format: "MMMM D")
  formattedEndAt: endAt(format: "MMMM D, YYYY")
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment Show2InstallShots_show on Show {
  name
  images {
    internalID
    caption
    src: url(version: ["larger", "large"])
    dimensions: resized(height: 300) {
      width
      height
    }
  }
}

fragment Show2_show on Show {
  ...Show2Header_show
  ...Show2InstallShots_show
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "showID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "showID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Show2TestsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Show2_show"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Show2TestsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": null
          },
          {
            "alias": "formattedStartAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "startAt",
            "storageKey": "startAt(format:\"MMMM D\")"
          },
          {
            "alias": "formattedEndAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMMM D, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": "endAt(format:\"MMMM D, YYYY\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              },
              {
                "alias": "src",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"larger\",\"large\"])"
              },
              {
                "alias": "dimensions",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 300
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  }
                ],
                "storageKey": "resized(height:300)"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "d6f92ff7b9230df729d4e3bd1270b735",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.endAt": (v4/*: any*/),
        "show.formattedEndAt": (v4/*: any*/),
        "show.formattedStartAt": (v4/*: any*/),
        "show.id": (v5/*: any*/),
        "show.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "show.images.caption": (v4/*: any*/),
        "show.images.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "show.images.dimensions.height": (v6/*: any*/),
        "show.images.dimensions.width": (v6/*: any*/),
        "show.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "show.images.src": (v4/*: any*/),
        "show.name": (v4/*: any*/),
        "show.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerTypes"
        },
        "show.partner.__isNode": (v7/*: any*/),
        "show.partner.__typename": (v7/*: any*/),
        "show.partner.id": (v5/*: any*/),
        "show.partner.name": (v4/*: any*/),
        "show.startAt": (v4/*: any*/)
      }
    },
    "name": "Show2TestsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'd6fbb3afb1d102b089523c9a4dbd9c5f';
export default node;