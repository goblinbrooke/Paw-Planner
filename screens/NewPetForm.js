import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "./UploadImage";

const NewPetForm = () => {
  const navigation = useNavigation();

  // state variables
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState();
  const [species, setSpecies] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onBlur" });

  // helper functions
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    if (isModalVisible === false) {
      reset();
      setImage();
      setSpecies();
      setImageUri();
    }
  };

  // Back to home
  const handleLogoClicked = () => {
    navigation.navigate("Home");
  };

  // post pet info to database
  const onSubmit = (petObject) => {
    // current user information
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    // generate petId
    const petId = uuid.v4();

    // endpoint for pets list
    const petsEndpoint = `https://paw-planner-default-rtdb.firebaseio.com/user/${userId}/pets.json`;

    // create body for patch request
    let newData = {};
    newData[petId] = { ...petObject, imageUri, species, petId };
    fetch(petsEndpoint === 0 ? petsEndpoint + "0" : petsEndpoint, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    toggleModal();
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Text style={styles.addtext}>???? Create your pet's profile! ????</Text>
        <UploadImage
          image={image}
          setImage={setImage}
          imageUri={imageUri}
          setImageUri={setImageUri}
        />

        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              iconName="person"
              iconType="MaterialIcons"
              placeholder="Enter pet's name"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          )}
        />

        {/* Age */}
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's age"
              keyboardType="numeric"
            />
          )}
        />

        {/* Birthday */}
        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              autoComplete="birthdate-day"
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's birthday"
            />
          )}
        />

        {/* Species */}
        <View>
          <Text style={styles.petSpeciesText}>Pet species:</Text>
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> cat</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("cat");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> dog</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("dog");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> bird</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("bird");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> small rodent</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("small rodent");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> fish</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("fish");
            }}
          />
        </View>

        {/* Breed */}
        <Controller
          control={control}
          name="breed"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's breed"
            />
          )}
        />

        {/* Coloring */}
        <Controller
          control={control}
          name="coloring"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's coloring"
            />
          )}
        />

        {/* Microchip */}
        <Controller
          control={control}
          name="microchip"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's microchip number"
              keyboardType="numeric"
            />
          )}
        />

        {/* Dietary Needs */}
        <Controller
          control={control}
          name="dietary needs"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet's dietary needs"
            />
          )}
        />

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          style={[styles.submitButton, styles.submitButtonOutline]}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitText}>Add my child! ????</Text>
        </TouchableOpacity>

        {/* Popup for successfully submitted form */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Fur baby added! ????</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleModal}
                >
                  <Text style={styles.textStyle}>Exit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        {/* Logo */}
        <TouchableOpacity
          onPress={handleLogoClicked}
          style={styles.logoContainer}
        >
          <View>
            <Image
              source={require("../assets/Illustration4.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>????HOME????</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NewPetForm;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "rgb(190, 225, 230)",
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "rgb(190, 225, 230)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  petSpeciesText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "rgb(226, 236, 233)",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
  },
  addtext: {
    color: "black",
    fontWeight: "700",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    flex: 1,
    width: 50,
    height: 50,
    marginTop: 20,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "rgb(190, 225, 230)",
    width: "60%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 40,
    alignSelf: "center",
  },
  submitButtonOutline: {
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 50,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
