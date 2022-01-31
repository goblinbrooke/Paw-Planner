import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";

// list that holds all of the pet components

function PetsListScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const petsDB = "https://paw-planner-default-rtdb.firebaseio.com/pets.json";

  const handlePets = async () => {
    console.log("in the handlePets function");
    try {
      // console.log("in the try block");
      const response = await fetch(petsDB);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log("There is an error!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePets();
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

export default PetsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "#0782F9",
    fontSize: 24,
    color: "white",
  },
});
