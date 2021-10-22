import { fireEvent, RenderAPI, waitFor } from "@testing-library/react-native"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { RecentSearch } from "lib/Scenes/Search/SearchModel"
import { __globalStoreTestUtils__ } from "lib/store/GlobalStore"
import { mockTrackEvent } from "lib/tests/globallyMockedStuff"
import { mockEnvironmentPayload } from "lib/tests/mockEnvironmentPayload"
import { renderWithWrappersTL } from "lib/tests/renderWithWrappers"
import { isPad } from "lib/utils/hardware"
import React from "react"
import { Keyboard } from "react-native"
import { createMockEnvironment } from "relay-test-utils"
import { Search2QueryRenderer } from "./Search2"

const banksy: RecentSearch = {
  type: "AUTOSUGGEST_RESULT_TAPPED",
  props: {
    displayLabel: "Banksy",
    displayType: "Artist",
    href: "https://artsy.com/artist/banksy",
    imageUrl: "https://org-name.my-cloud-provider.com/bucket-hash/content-hash.jpg",
    __typename: "Artist",
  },
}

jest.unmock("react-relay")
jest.mock("lib/utils/hardware", () => ({
  isPad: jest.fn(),
}))
jest.mock("lib/utils/useSearchInsightsConfig", () => ({
  useSearchInsightsConfig: () => true,
}))

describe("Search2 Screen", () => {
  const mockEnvironment = defaultEnvironment as ReturnType<typeof createMockEnvironment>

  beforeEach(() => {
    mockEnvironment.mockClear()
  })

  const TestRenderer = () => {
    return <Search2QueryRenderer />
  }

  it("should render a text input with placeholder", async () => {
    const { getByPlaceholderText, getByText, queryByText } = renderWithWrappersTL(<TestRenderer />)

    mockEnvironmentPayload(mockEnvironment, {
      Algolia: () => ({
        appID: "",
        apiKey: "",
        indices: [{ name: "Artist_staging", displayName: "Artists" }],
      }),
    })

    const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

    // Pill should not be visible
    expect(queryByText("Artists")).toBeFalsy()

    // should show City Guide
    expect(getByText("City Guide")).toBeTruthy()
    expect(getByText("Recent Searches")).toBeTruthy()

    fireEvent.changeText(searchInput, "Ba")
    expect(searchInput).toHaveProp("value", "Ba")

    // Pills should be visible
    await waitFor(() => {
      getByText("Artworks")
      getByText("Artists")
    })
  })

  it("does not show city guide entrance when on iPad", () => {
    const isPadMock = isPad as jest.Mock
    isPadMock.mockImplementationOnce(() => true)
    const { queryByText } = renderWithWrappersTL(<TestRenderer />)
    expect(queryByText("City Guide")).toBeFalsy()
  })

  it("shows city guide entrance when there are recent searches", () => {
    __globalStoreTestUtils__?.injectState({
      search: {
        recentSearches: [banksy],
      },
    })
    const isPadMock = isPad as jest.Mock
    isPadMock.mockImplementationOnce(() => false)
    const { getByText } = renderWithWrappersTL(<TestRenderer />)
    expect(getByText("Explore art on view")).toBeTruthy()
  })

  it('the "Top" pill should be selected by default', () => {
    const { getByA11yState, getByPlaceholderText } = renderWithWrappersTL(<TestRenderer />)
    const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

    fireEvent.changeText(searchInput, "text")

    expect(getByA11yState({ selected: true })).toHaveTextContent("Top")
  })

  it("should not be able to untoggle the same pill", () => {
    const { getByPlaceholderText, getByText, getByA11yState } = renderWithWrappersTL(<TestRenderer />)
    const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

    mockEnvironmentPayload(mockEnvironment, {
      Algolia: () => ({
        appID: "",
        apiKey: "",
        indices: [
          {
            name: "Artist_staging",
            displayName: "Artists",
          },
          {
            name: "Gallery_staging",
            displayName: "Gallery",
          },
        ],
      }),
    })

    fireEvent(searchInput, "changeText", "prev value")
    fireEvent(getByText("Artists"), "press")

    expect(getByA11yState({ selected: true })).toHaveTextContent("Artists")
  })

  describe("search pills", () => {
    it("are displayed when the user has typed the minimum allowed number of characters", () => {
      const { getByPlaceholderText, queryByText } = renderWithWrappersTL(<TestRenderer />)

      mockEnvironmentPayload(mockEnvironment, {
        Algolia: () => ({
          appID: "",
          apiKey: "",
          indices: [{ name: "Artist_staging", displayName: "Artist" }],
        }),
      })

      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")
      fireEvent(searchInput, "changeText", "Ba")
      expect(queryByText("Top")).toBeDefined()
      expect(queryByText("Artist")).toBeDefined()
    })

    it("hide keyboard when selecting other pill", () => {
      const { getByText, getByPlaceholderText } = renderWithWrappersTL(<TestRenderer />)

      mockEnvironmentPayload(mockEnvironment, {
        Algolia: () => ({
          appID: "",
          apiKey: "",
          indices: [{ name: "Artist_staging", displayName: "Artist" }],
        }),
      })

      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")
      const keyboardDismissSpy = jest.spyOn(Keyboard, "dismiss")
      fireEvent(searchInput, "changeText", "Ba")
      fireEvent(getByText("Artist"), "press")
      expect(keyboardDismissSpy).toHaveBeenCalled()
    })

    it("should track event when a pill is tapped", () => {
      const { getByText, getByPlaceholderText } = renderWithWrappersTL(<TestRenderer />)

      mockEnvironmentPayload(mockEnvironment, {
        Algolia: () => ({
          appID: "",
          apiKey: "",
          indices: [{ name: "Artist_staging", displayName: "Artist" }],
        }),
      })

      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")
      fireEvent(searchInput, "changeText", "text")

      fireEvent(getByText("Artist"), "press")
      expect(mockTrackEvent.mock.calls[1]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "tappedNavigationTab",
            "context_module": "topTab",
            "context_screen": "Search",
            "context_screen_owner_type": "search",
            "query": "text",
            "subject": "Artist",
          },
        ]
      `)
    })

    it("should correctly track the previusly applied pill context module", () => {
      const { getByText, getByPlaceholderText } = renderWithWrappersTL(<TestRenderer />)

      mockEnvironmentPayload(mockEnvironment, {
        Algolia: () => ({
          appID: "",
          apiKey: "",
          indices: [{ name: "Artist_staging", displayName: "Artist" }],
        }),
      })

      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")
      fireEvent(searchInput, "changeText", "text")

      fireEvent(getByText("Artist"), "press")
      expect(mockTrackEvent.mock.calls[1]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "tappedNavigationTab",
            "context_module": "topTab",
            "context_screen": "Search",
            "context_screen_owner_type": "search",
            "query": "text",
            "subject": "Artist",
          },
        ]
      `)

      fireEvent(getByText("Artworks"), "press")
      expect(mockTrackEvent.mock.calls[2]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "tappedNavigationTab",
            "context_module": "artistsTab",
            "context_screen": "Search",
            "context_screen_owner_type": "search",
            "query": "text",
            "subject": "Artworks",
          },
        ]
      `)
    })
  })

  describe("the top pill is selected by default", () => {
    let tree: RenderAPI

    beforeEach(() => {
      tree = renderWithWrappersTL(<TestRenderer />)

      mockEnvironmentPayload(mockEnvironment, {
        Algolia: () => ({
          appID: "",
          apiKey: "",
          indices: [
            {
              name: "Artist_staging",
              displayName: "Artists",
            },
          ],
        }),
      })
    })

    it("when search query is empty", () => {
      const { queryByA11yState, getByPlaceholderText, getByText } = tree
      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

      fireEvent(searchInput, "changeText", "prev value")
      fireEvent(getByText("Artists"), "press")
      fireEvent(searchInput, "changeText", "")
      fireEvent(searchInput, "changeText", "new value")

      expect(queryByA11yState({ selected: true })).toHaveTextContent("Top")
    })

    it("when the query is changed", () => {
      const { queryByA11yState, getByPlaceholderText, getByText } = tree
      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

      fireEvent(searchInput, "changeText", "12")
      fireEvent(getByText("Artists"), "press")
      fireEvent(searchInput, "changeText", "123")

      expect(queryByA11yState({ selected: true })).toHaveTextContent("Top")
    })

    it("when clear button is pressed", () => {
      const { queryByA11yState, getByPlaceholderText, getByText, getByA11yLabel } = tree
      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

      fireEvent(searchInput, "changeText", "prev value")
      fireEvent(getByText("Artists"), "press")
      fireEvent(getByA11yLabel("Clear input button"), "press")
      fireEvent(searchInput, "changeText", "new value")

      expect(queryByA11yState({ selected: true })).toHaveTextContent("Top")
    })

    it("when cancel button is pressed", () => {
      const { queryByA11yState, getByPlaceholderText, getByText, getAllByText } = tree
      const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

      fireEvent(searchInput, "changeText", "prev value")
      fireEvent(getByText("Artists"), "press")
      fireEvent(searchInput, "focus")
      fireEvent(getAllByText("Cancel")[0], "press")
      fireEvent(searchInput, "changeText", "new value")

      expect(queryByA11yState({ selected: true })).toHaveTextContent("Top")
    })
  })

  it("should track event when a search result is pressed", async () => {
    const { getByPlaceholderText, findAllByText } = renderWithWrappersTL(<TestRenderer />)
    const searchInput = getByPlaceholderText("Search artists, artworks, galleries, etc")

    mockEnvironmentPayload(mockEnvironment, {
      Algolia: () => ({
        appID: "",
        apiKey: "",
        indices: [{ name: "Artist_staging", displayName: "Artist" }],
      }),
    })

    fireEvent(searchInput, "changeText", "text")

    mockEnvironmentPayload(mockEnvironment, {
      SearchableConnection: () => ({
        edges: [
          {
            node: {
              displayLabel: "Banksy",
            },
          },
        ],
      }),
    })

    const elements = await findAllByText("Banksy")
    fireEvent.press(elements[0])

    expect(mockTrackEvent.mock.calls[1]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "selectedResultFromSearchScreen",
          "context_module": "topTab",
          "context_screen": "Search",
          "context_screen_owner_type": "Search",
          "position": 0,
          "query": "text",
          "selected_object_slug": "slug-1",
          "selected_object_tab": undefined,
          "selected_object_type": "displayType-1",
        },
      ]
    `)
  })
})