import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";

export default function UploadImage(props) {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      props.setImage(_image.uri);
      const reference = storage().ref(_image);
      // postImageUrl(_image.uri);
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Allow Paw Planner access to your camera roll?");
    } else {
      console.log("Media Permissions are granted");
    }
  };

  const postImage = async (image) => {
    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/images`;
    await reference.putFile(pathToFile);
  };

  // const postImageUrl = (_image) => {
  //   fetch("gs://paw-planner.appspot.com/.json", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(_image),
  //   })
  //     .then(() => {
  //       console.log("in the then");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const getImageUrl = (endpoint) => {
  //   try {
  //     const response = await fetch(
  //       "gs://paw-planner.appspot.com/" + endpoint + ".json"
  //     );
  //     const json = await response.json();

  //     // changing data from nested dicts to a list of dicts
  //     setImage(json.uri);
  //   } catch (error) {
  //     console.log("There is an error!");
  //     console.error(error);
  //   }
  // };

  return (
    <View style={imageUploaderStyles.container}>
      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={(checkForCameraRollPermission, addImage)}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{props.image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

UploadImage.propTypes = {
  setImage: PropTypes.func.isRequired,
  image: PropTypes.string,
};
