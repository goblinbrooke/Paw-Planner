import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import PropTypes from "prop-types";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function UploadImage(props) {
  // state variables
  const [uploading, setUploading] = useState(false);
  const [imageToUpload, setImageToUpload] = useState();

  useEffect(() => {
    async function uploadCode() {
      if (!imageToUpload) {
        return;
      }

      const imageId = uuid.v4();

      const storage = getStorage();
      const pathReference = ref(storage, `images/${imageId}.jpg`);

      console.log("This is the pathReference: ", JSON.stringify(pathReference));

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
      const fetchResponse = await fetch(props.image);
      console.log("This is fetchResponse: ", fetchResponse);

      const blob = await fetchResponse.blob();
      console.log("HERE IS THE BLOB");
      console.log(typeof blob);
      console.log(JSON.stringify(blob));

      // Upload file and metadata to the object 'images/pet.jpg'
      const uploadTask = uploadBytesResumable(pathReference, blob, metadata);
      setUploading(true);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              setUploading(false);
              break;
            case "running":
              console.log("Upload is running");
              setUploading(true);
              break;
          }
        },
        (error) => {
          setUploading(false);
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            props.setImageUri(downloadURL);
          });
        }
      );
    }
    uploadCode();
  }, [imageToUpload]);

  const addImage = async () => {
    console.log("1");
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      props.setImage(_image.uri);
    }
  };

  const uploadFile = async () => {
    console.log(typeof props.image);
    console.log(JSON.stringify(props.image));
    setImageToUpload(props.image);
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Allow Paw Planner access to your camera roll?");
    } else {
      console.log("Media Permissions are granted");
    }
  };

  return (
    <View>
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
            <Text>{props.image ? "Edit" : "Select"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Photo Button */}
      <TouchableOpacity
        style={[
          imageUploaderStyles.button,
          imageUploaderStyles.buttonOutlineWhite,
        ]}
        title="upload"
        onPress={uploadFile}
      >
        <Text style={imageUploaderStyles.buttonText}>Say "Cheese"! 📸</Text>
      </TouchableOpacity>
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
    padding: 10,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonOutlineWhite: {
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(190, 225, 230)",
    width: "60%",
    height: 50,
    padding: 15,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});

UploadImage.propTypes = {
  setImage: PropTypes.func.isRequired,
  image: PropTypes.string,
};
