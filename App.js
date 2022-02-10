import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { app } from "./firebase.js";
import PetsListScreen from "./screens/PetsListScreen";
import NewPetForm from "./screens/NewPetForm";
import PetScreen from "./screens/PetScreen";
import React, { useState } from "react";

const Stack = createNativeStackNavigator();

// exporting data and setData to all children components
export const PetData = React.createContext();

export default function App() {
  const [data, setData] = useState([]);

  return (
    <PetData.Provider value={{ data, setData }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewPet" component={NewPetForm} />
          <Stack.Screen name="PetsList" component={PetsListScreen} />
          <Stack.Screen name="PetScreen" component={PetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PetData.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
