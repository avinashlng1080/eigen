import { AboutWork_artwork } from "__generated__/AboutWork_artwork.graphql"
import { renderWithWrappersTL } from "lib/tests/renderWithWrappers"
import React from "react"
import { AboutWork } from "./AboutWork"

jest.mock("lib/utils/hardware", () => ({
  truncatedTextLimit: jest.fn(),
}))

import { truncatedTextLimit } from "lib/utils/hardware"

describe("AboutWork", () => {
  beforeEach(() => {
    ;(truncatedTextLimit as jest.Mock).mockReset()
  })

  it("renders the AboutWork correctly if all info is present", () => {
    const { queryByText } = renderWithWrappersTL(<AboutWork artwork={aboutWorkArtwork} />)
    expect(queryByText("About the work")).toBeTruthy()
    expect(queryByText("From Artsy Specialist:")).toBeTruthy()
  })

  it("renders the AboutWork correctly if only additional information is present", () => {
    const artworkNoDescription = { ...aboutWorkArtwork, description: null }

    const { queryByText } = renderWithWrappersTL(<AboutWork artwork={artworkNoDescription} />)
    expect(queryByText("About the work")).toBeTruthy()
    expect(queryByText("From Artsy Specialist:")).toBeFalsy()
  })

  it("renders the AboutWork correctly if only description is present", () => {
    const artworkNoAdditionalInfo = { ...aboutWorkArtwork, additional_information: null }

    const { queryByText } = renderWithWrappersTL(<AboutWork artwork={artworkNoAdditionalInfo} />)
    expect(queryByText("About the work")).toBeTruthy()
    expect(queryByText("From Artsy Specialist:")).toBeTruthy()
  })

  it("renders nothing if no information is present", () => {
    const artworkNoInfo = { ...aboutWorkArtwork, additional_information: null, description: null }

    const { queryByText } = renderWithWrappersTL(<AboutWork artwork={artworkNoInfo} />)
    expect(queryByText("About the work")).toBeFalsy()
    expect(queryByText("From Artsy Specialist:")).toBeFalsy()
  })

  it("hides 'From Artsy Specialist:' for auction works", () => {
    const artworkInAuction = { ...aboutWorkArtwork, isInAuction: true }

    const { queryByText } = renderWithWrappersTL(<AboutWork artwork={artworkInAuction} />)
    expect(queryByText("From Artsy Specialist:")).toBeFalsy()
  })
})

const aboutWorkArtwork: AboutWork_artwork = {
  additional_information:
    "This is some information about the artwork by the gallery. It has to be at least 320 characters in order to test that the read more component truncates possibly. So here is soem lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  description: "This is some information about the artwork by Artsy.",
  isInAuction: false,
  " $refType": "AboutWork_artwork",
}