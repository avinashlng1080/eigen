/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 79caa0c330d4c63b9272ec4f52ac8cf6 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EditSavedSearchAlertQueryVariables = {
    artistID: string;
};
export type EditSavedSearchAlertQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"EditSavedSearchAlert_artist">;
    } | null;
    readonly artworksConnection: {
        readonly " $fragmentRefs": FragmentRefs<"EditSavedSearchAlert_artworksConnection">;
    } | null;
};
export type EditSavedSearchAlertQuery = {
    readonly response: EditSavedSearchAlertQueryResponse;
    readonly variables: EditSavedSearchAlertQueryVariables;
};



/*
query EditSavedSearchAlertQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...EditSavedSearchAlert_artist
    id
  }
  artworksConnection(first: 0, artistID: $artistID, aggregations: [ARTIST, LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]) {
    ...EditSavedSearchAlert_artworksConnection
    id
  }
}

fragment EditSavedSearchAlert_artist on Artist {
  internalID
  name
}

fragment EditSavedSearchAlert_artworksConnection on FilterArtworksConnection {
  aggregations {
    slice
    counts {
      count
      name
      value
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "ARTIST",
      "LOCATION_CITY",
      "MATERIALS_TERMS",
      "MEDIUM",
      "PARTNER",
      "COLOR"
    ]
  },
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "artistID"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditSavedSearchAlertQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditSavedSearchAlert_artist"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditSavedSearchAlert_artworksConnection"
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
    "name": "EditSavedSearchAlertQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworksAggregationResults",
            "kind": "LinkedField",
            "name": "aggregations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AggregationCount",
                "kind": "LinkedField",
                "name": "counts",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "79caa0c330d4c63b9272ec4f52ac8cf6",
    "metadata": {},
    "name": "EditSavedSearchAlertQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'b7ba8ea3f6d77b3e8cb1436877763543';
export default node;
