import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { app } from "./firebase.js";
import PetsListScreen from "./screens/PetsListScreen";
import NewPetForm from "./screens/NewPetForm";
import UploadImage from "./screens/UploadImage";
import PetScreen from "./screens/PetScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <PetScreen />
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
      </Stack.Navigator>
    </NavigationContainer>
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
