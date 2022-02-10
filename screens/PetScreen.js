import React, { useState } from "react";
import { Text, Button, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PetScreen(props) {
  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // database endpoint
  // const pet =
  //   "https://paw-planner-default-rtdb.firebaseio.com/user/123/pets/-MvW5GI4H2rZPz2JwVc3.json";

  // const handlePet = async () => {
  //   try {
  //     // console.log("in the try block");
  //     const response = await fetch(pet);
  //     const json = await response.json();
  //     setData(json);
  //     console.log(json);
  //   } catch (error) {
  //     console.log("There is an error!");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log(typeof data);
  const handleLogoClicked = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <SafeAreaView>
      {/* <Button title="Pet info!" onPress={handlePet}></Button>
      <Button title="get-request" onPress={handlePet}>
        <Text>Run the get request</Text> */}
      {/* </Button> */}
      <View>
        {/* <Image
          source={{ uri: props.data.imageUri }}
          style={{ width: 200, height: 200 }}
        /> */}
      </View>
      <Text>Pet name: {data.name}</Text>
      <Text>Pet age: {data.age}</Text>
      <Text>Pet birthday: {data.birthday}</Text>
      <Text>Pet microchip: {data.microchip}</Text>
      <Text>Pet species: {data.species}</Text>
      <Text>Pet breed: {data.breed}</Text>
      <Text>Pet coloring: {data.coloring}</Text>
    </SafeAreaView>
  );
}

export default PetScreen;
