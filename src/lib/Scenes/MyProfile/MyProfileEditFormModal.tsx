import { useActionSheet } from "@expo/react-native-action-sheet"
import { MyProfileEditFormModal_me } from "__generated__/MyProfileEditFormModal_me.graphql"
import { useFormik } from "formik"
import { Image } from "lib/Components/Bidding/Elements/Image"
import { FancyModal } from "lib/Components/FancyModal/FancyModal"
import { FancyModalHeader } from "lib/Components/FancyModal/FancyModalHeader"
import { LoadingIndicator } from "lib/Components/LoadingIndicator"
import { getConvertedImageUrlFromS3 } from "lib/utils/getConvertedImageUrlFromS3"
import { LocalImage } from "lib/utils/LocalImageStore"
import { showPhotoActionSheet } from "lib/utils/requestPhotos"
import { compact, isArray } from "lodash"
import { Avatar, Box, Button, Flex, Input, Join, Spacer, Text, Touchable, useColor } from "palette"
import React, { useRef, useState } from "react"
import { ScrollView, TextInput } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import * as Yup from "yup"
import { updateMyUserProfile } from "../MyAccount/updateMyUserProfile"

interface MyProfileEditFormModalProps {
  visible: boolean
  me: MyProfileEditFormModal_me
  setProfileIconLocally: (path: string) => void
  localImage: LocalImage | null
  onDismiss(): void
}

export interface EditMyProfileValuesSchema {
  photo: string
  name: string
  // TODO: Location
  profession: string
  otherRelevantPosition: string
  bio: string
}

export const editMyProfileSchema = Yup.object().shape({
  photo: Yup.string(),
  name: Yup.string().required("Name is required"),
  bio: Yup.string(),
})

export const MyProfileEditFormModal: React.FC<MyProfileEditFormModalProps> = (props) => {
  const { visible, onDismiss, me, setProfileIconLocally } = props
  const color = useColor()
  const { showActionSheetWithOptions } = useActionSheet()
  const nameInputRef = useRef<Input>(null)
  const bioInputRef = useRef<TextInput>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [didUpdatePhoto, setDidUpdatePhoto] = useState(false)

  const uploadProfilePhoto = async (photo: string) => {
    const existingProfileImage = me.icon?.url ?? ""
    try {
      // We want to show the local image initially for better UX since Gemini takes a while to process
      setProfileIconLocally(photo)
      const iconUrl = await getConvertedImageUrlFromS3(photo)
      await updateMyUserProfile({ iconUrl })
    } catch (error) {
      setProfileIconLocally(existingProfileImage)
      console.error("Failed to upload profile picture ", error)
    }
  }

  const updateUserInfo = async (updatedValues: Partial<EditMyProfileValuesSchema>) => {
    try {
      await updateMyUserProfile(updatedValues)
    } catch (error) {
      console.error(`Failed to update ${Object.keys(updatedValues)}`, error)
    }
  }

  const { handleSubmit, handleChange, dirty, values, errors, validateForm } = useFormik<EditMyProfileValuesSchema>({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: me?.name ?? "",
      // TODO: Location
      profession: me?.profession ?? "",
      otherRelevantPosition: me?.otherRelevantPosition ?? "",
      bio: me?.bio ?? "",
      photo: me?.icon?.url ?? props.localImage?.path ?? "",
    },
    initialErrors: {},
    onSubmit: async ({ photo, ...otherValues }) => {
      try {
        setLoading(true)
        await Promise.all(
          compact([await updateUserInfo(otherValues), didUpdatePhoto && (await uploadProfilePhoto(photo))])
        )
      } catch (error) {
        console.error("Failed to update user profile ", error)
      } finally {
        setLoading(false)
      }
      onDismiss()
    },
    validationSchema: editMyProfileSchema,
  })

  const chooseImageHandler = () => {
    showPhotoActionSheet(showActionSheetWithOptions, true, false)
      .then((images) => {
        if (isArray(images) && images.length >= 1) {
          setDidUpdatePhoto(true)
          ;(handleChange("photo") as (value: string) => void)(images[0].path)
        }
      })
      .catch((e) => console.error("Error when uploading an image from the device", JSON.stringify(e)))
  }

  const hideModal = () => {
    setDidUpdatePhoto(false)
    onDismiss()
    // @ts-ignore
    handleChange("photo")(me?.icon?.url ?? props.localImagePath ?? "")
    // @ts-ignore
    handleChange("name")(me?.name ?? "")
    // @ts-ignore
    handleChange("bio")(me?.bio ?? "")
  }

  return (
    <FancyModal visible={visible} onBackgroundPressed={hideModal}>
      <FancyModalHeader leftButtonText="Cancel" onLeftButtonPress={hideModal}>
        Edit Profile
      </FancyModalHeader>

      <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
        <Join separator={<Spacer py={1} />}>
          <Flex flexDirection="row" alignItems="center" px={2} mt={2}>
            <Touchable onPress={chooseImageHandler}>
              <Box
                height="99"
                width="99"
                mr={2}
                borderRadius="50"
                backgroundColor={color("black10")}
                justifyContent="center"
                alignItems="center"
              >
                {!!values.photo ? (
                  <Avatar src={values.photo} size="md" />
                ) : (
                  <Image source={require("../../../../images/profile_placeholder_avatar.webp")} />
                )}
              </Box>
            </Touchable>
            <Touchable haptic onPress={chooseImageHandler}>
              <Text style={{ textDecorationLine: "underline" }}>Choose an Image</Text>
            </Touchable>
          </Flex>
          <Flex mx={2}>
            <Join separator={<Spacer py={2} />}>
              <Input
                ref={nameInputRef}
                title="Full Name"
                onChangeText={handleChange("name")}
                onBlur={() => validateForm()}
                error={errors.name}
                returnKeyType="next"
                defaultValue={values.name}
              />

              {/* TODO: Primary Location */}

              <Input
                ref={nameInputRef}
                title="Profession"
                onChangeText={handleChange("profession")}
                onBlur={() => validateForm()}
                error={errors.name}
                returnKeyType="next"
                defaultValue={values.profession}
                placeholder="Select Your Profession"
              />

              {/* TODO: Other other relevant position */}

              {/* <Input
                ref={nameInputRef}
                title="Other Relevant Position"
                onChangeText={handleChange("otherRelevantPosition")}
                onBlur={() => validateForm()}
                error={errors.name}
                returnKeyType="next"
                defaultValue={values.otherRelevantPosition}
                placeholder="Institution Name and Position"
              /> */}

              <Input
                ref={bioInputRef}
                title="About"
                onChangeText={handleChange("bio")}
                onBlur={() => validateForm()}
                error={errors.bio}
                maxLength={150}
                multiline
                showLimit
                defaultValue={values.bio}
                placeholder="You can add a short bio to tell more about yourself and your collection. It can be anything like the artists you collect, the genres you're interested in , etc."
              />

              <Button flex={1} disabled={!dirty} onPress={handleSubmit}>
                Save
              </Button>
            </Join>
          </Flex>
        </Join>
      </ScrollView>
      {!!loading && <LoadingIndicator />}
    </FancyModal>
  )
}

// TODO: location
export const MyProfileEditFormModalFragmentContainer = createFragmentContainer(MyProfileEditFormModal, {
  me: graphql`
    fragment MyProfileEditFormModal_me on Me {
      name
      profession
      otherRelevantPosition
      bio
      icon {
        url(version: "thumbnail")
      }
    }
  `,
})
