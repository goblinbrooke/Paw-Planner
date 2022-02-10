import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

function PetsListScreen(props) {
  // state variables
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // database endpoint
  const petsDB =
    "https://paw-planner-default-rtdb.firebaseio.com/user/123/pets.json";

  const handlePets = async () => {
    try {
      // console.log("in the try block");
      const response = await fetch(petsDB);
      const json = await response.json();

      // changing data from nested dicts to a list of dicts
      setData(dataList(json));
    } catch (error) {
      console.log("There is an error!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();
  const handleLogoClicked = () => {
    console.log("button pressed");
    navigation.navigate("Home");
  };

  useEffect(() => {
    handlePets();
  }, []);

  const dataList = (data) => {
    const petData = [];
    for (let pet in data) {
      petData.push(data[pet]);
    }
    return petData;
  };

  const handlePetClicked = () => {
    console.log("button pressed");
    navigation.replace("PetScreen");
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
        Currently viewing the fur children of: 💗{auth.currentUser?.email}
      </Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <Button
              title={item.name}
              style={styles.item}
              onPress={handlePetClicked}
            >
              {item.name}
            </Button>
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
