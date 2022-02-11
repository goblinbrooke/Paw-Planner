import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import App, { PetData } from "../App";

function PetsListScreen() {
  const navigation = useNavigation();

  // state variables
  const [isLoading, setLoading] = useState(true);
  const [petsList, setPetsList] = useState();

  const data = useContext(PetData);

  // helper functions
  const getCurrentUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user.uid;
  };

  // Back to home
  const handleLogoClicked = () => {
    console.log("button pressed");
    navigation.navigate("Home");
  };

  useEffect(() => {
    handlePets();
  }, []);

  const dataList = (json) => {
    const petsList = [];
    for (let petId in json) {
      petsList.push(json[petId]);
      console.log("WE ARE HERE", json[petId]);
    }
    return petsList;
  };

  const handlePetClicked = (petObject) => {
    console.log("button pressed");
    navigation.push("PetScreen", petObject);
  };

  // get all pets for a specific user
  const handlePets = async () => {
    const userId = getCurrentUser();

    // database endpoint
    const petsEndpoint = `https://paw-planner-default-rtdb.firebaseio.com/user/${userId}/pets.json`;
    try {
      const response = await fetch(petsEndpoint);
      const json = await response.json();
      console.log("THIS IS THE JSON RESPONSE:", json);

      // changing data from nested dicts to a list of dicts
      setPetsList(dataList(json));
      console.log("This is pets list:", petsList);
    } catch (error) {
      console.log("There is an error!");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get Request for Pet Data
  const handlePet = async (petObject) => {
    const userId = getCurrentUser();
    const petId = petObject.petId;

    // database endpoint
    const petEndpoint = `https://paw-planner-default-rtdb.firebaseio.com/user/${userId}/pets/${petId}.json`;
    try {
      const response = await fetch(petEndpoint);
      const json = await response.json();
      data.setData(json);
      console.log(json);
    } catch (error) {
      console.log("There is an error!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Currently logged in */}
      <Text style={styles.textStyle}>
        Currently viewing the fur children of:{" "}
      </Text>
      <Text style={[styles.textStyle, styles.textBottom]}>
        {" "}
        💗{auth.currentUser?.email}
      </Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item.petId}
          data={petsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              title={item.name}
              style={styles.item}
              onPress={() => {
                handlePetClicked(item);
                handlePet(item);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

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
          <Text style={styles.logoText}>💗HOME💗</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PetsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "rgb(226, 236, 233)",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "rgb(190, 225, 230)",
    borderRadius: 20,
    fontSize: 24,
    color: "white",
    fontStyle: "bold",
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    flex: 1,
    marginTop: 20,
    left: 130,
    resizeMode: "contain",
    //
    // flex: 1,
    // width: 50,
    // height: 50,
    // marginTop: 20,
    // resizeMode: 'contain',
    // left: 150,
  },
  logoText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    left: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    // fontFamily: "normal",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  textBottom: {
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    // fontFamily: "Avenir",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
