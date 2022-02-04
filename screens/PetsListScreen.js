import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
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
    backgroundColor: "rgb(226, 236, 233)",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "rgb(190, 225, 230)",
    fontSize: 24,
    color: "white",
  },
});
