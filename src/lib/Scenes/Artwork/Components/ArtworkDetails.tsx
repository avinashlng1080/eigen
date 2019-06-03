import { Box, Sans } from "@artsy/palette"
import { ArtworkDetails_artwork } from "__generated__/ArtworkDetails_artwork.graphql"
// import { capitalize } from "lodash"
import React from "react"
import { Button } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkDetailsProps {
  artwork: ArtworkDetails_artwork
}

interface ArtworkDetailsState {
  show_all: boolean
}

export class ArtworkDetails extends React.Component<ArtworkDetailsProps, ArtworkDetailsState> {
  constructor(props) {
    super(props)
    this.state = { show_all: false }
  }

  render() {
    const listItems = [
      { title: "Medium", value: this.props.artwork.medium },
      {
        title: "Condition",
        value: this.props.artwork.conditionDescription ? this.props.artwork.conditionDescription.label : null,
      },
      { title: "Signature", value: this.props.artwork.signature },
      {
        title: "Certificate of Authenticity",
        value: this.props.artwork.certificateOfAuthenticity ? this.props.artwork.certificateOfAuthenticity.label : null,
      },
      { title: "Frame", value: this.props.artwork.framed ? this.props.artwork.framed.label : null },
      { title: "Series", value: this.props.artwork.series },
      { title: "Publisher", value: this.props.artwork.publisher },
      { title: "Manufacturer", value: this.props.artwork.manufacturer },
      { title: "Image rights", value: this.props.artwork.image_rights },
    ]

    let displayItems = listItems.filter(i => i.value != null)

    if (!this.state.show_all && displayItems.length > 3) {
      displayItems = displayItems.slice(0, 3)
    }

    return (
      <Box>
        <Sans size="4" weight="medium">
          Artwork Details
        </Sans>
        {displayItems.map(i => (
          <>
            <Sans size="3" weight="medium">
              {i.title}
            </Sans>
            <Sans size="3" weight="regular">
              {i.value}
            </Sans>
          </>
        ))}
        {!this.state.show_all && (
          <Button
            onPress={() => {
              this.setState({ show_all: true })
            }}
            title="Show more artwork details"
          />
        )}
      </Box>
    )
  }
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(ArtworkDetails, {
  artwork: graphql`
    fragment ArtworkDetails_artwork on Artwork {
      medium
      conditionDescription {
        label
        details
      }
      signature(format: PLAIN)
      signatureInfo {
        label
        details
      }
      certificateOfAuthenticity {
        label
        details
      }
      framed {
        label
        details
      }
      series(format: PLAIN)
      publisher(format: PLAIN)
      manufacturer(format: PLAIN)
      image_rights
    }
  `,
})
