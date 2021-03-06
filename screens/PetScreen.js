import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import App, { PetData } from "../App";

function PetScreen({ route, navigation }) {
  // useContext from App.js
  const data = useContext(PetData);

  const petObject = route.params;

  // Back to home
  const handleLogoClicked = () => {
    navigation.replace("Home");
  };

  // helper functions
  const getCurrentUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user.uid;
  };
  // delete pet
  const deleteRequest = () => {
    const userId = getCurrentUser(); // get current user id
    const petId = petObject.petId; // get pet id

    // database endpoint
    const petEndpoint = `https://paw-planner-default-rtdb.firebaseio.com/user/${userId}/pets/${petId}.json`;
    try {
      fetch(petEndpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(console.log("delete button pressed"))
        .then(navigation.replace("Home"));
      console.log("delete button pressed");
    } catch (error) {
      console.log("There is an error!");
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: petObject.imageUri }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <Text style={styles.petInfo}>Pet name: {petObject.name}</Text>
        <Text style={styles.petInfo}>Pet age: {petObject.age}</Text>
        <Text style={styles.petInfo}>Pet birthday: {petObject.birthday}</Text>
        <Text style={styles.petInfo}>Pet microchip: {petObject.microchip}</Text>
        <Text style={styles.petInfo}>Pet species: {petObject.species}</Text>
        <Text style={styles.petInfo}>Pet breed: {petObject.breed}</Text>
        <Text style={styles.petInfo}>Pet coloring: {petObject.coloring}</Text>
        <TouchableOpacity
          title={"delete pet"}
          style={[styles.button, styles.buttonOutlineWhite]}
          onPress={deleteRequest}
        >
          <Text style={styles.buttonText}>Remove pet</Text>
        </TouchableOpacity>

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
}

export default PetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(250, 210, 225)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  petInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    color: "black",
  },
  button: {
    backgroundColor: "rgb(250, 210, 225)",
    width: "60%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonOutlineWhite: {
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
});
