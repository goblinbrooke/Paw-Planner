import React, { useContext } from "react";
import { Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import App, { PetData } from "../App";

function PetScreen() {
  // useContext from App.js
  const data = useContext(PetData);

  const handleLogoClicked = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <SafeAreaView>
      <View>
        <Image
          source={{ uri: data.data.imageUri }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <Text>Pet name: {data.data.name}</Text>
      <Text>Pet age: {data.data.age}</Text>
      <Text>Pet birthday: {data.data.birthday}</Text>
      <Text>Pet microchip: {data.data.microchip}</Text>
      <Text>Pet species: {data.data.species}</Text>
      <Text>Pet breed: {data.data.breed}</Text>
      <Text>Pet coloring: {data.data.coloring}</Text>
    </SafeAreaView>
  );
}

export default PetScreen;
