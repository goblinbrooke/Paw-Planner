import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Button,
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
      // console.log("This is the object:", json);
      // console.log("------------------------------------------");
      setData(json);
      // console.log("Trying to print here:", json[id].name);
      // console.log("------------------------------------------");
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

  const petInfo = (data) => {
    const petData = [];
    for (let pet in data) {
      petData.push(data[pet]);
      // console.log(data[pet].name);
    }
    return petData;
  };

  console.log(petInfo(data));

  //   const DATA = {
  //     id1: {
  //       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //       name: "First Item",
  //     },
  //     id2: {
  //       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //       name: "Second Item",
  //     },
  //     id3: {
  //       id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //       name: "Third Item",
  //     },
  //   };

  //   const Item = ({ name }) => (
  //     <View style={styles.item}>
  //       <Text style={styles.title}>{name}</Text>
  //     </View>
  //   );

  //   const renderItem = ({ item }) => <Item name={item.name} />;

  //   return (
  //     <SafeAreaView style={styles.container}>
  //       {/* <FlatList
  //         data={DATA}
  //         renderItem={renderItem}
  //         keyExtractor={(item) => item.id}
  //       /> */}
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={petInfo}
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
