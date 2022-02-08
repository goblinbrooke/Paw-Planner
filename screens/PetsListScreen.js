import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
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


  return (
    <View style={styles.container}>

      {/* Currently logged in */}
      <Text style={styles.textStyle}>Currently viewing the fur children of: 💗{auth.currentUser?.email}</Text>
      
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.name}</Text>
          )}
        />
      )}
      
      {/* Logo */}
      <TouchableOpacity onPress={handleLogoClicked} style={styles.logoContainer}>
        <View>
          <Image source={require("../assets/Illustration4.png")} style={styles.logo} />
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 20,
    left: 130,
    resizeMode: "contain",

  },
  logoText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    left: 300,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    fontFamily: "Avenir",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
