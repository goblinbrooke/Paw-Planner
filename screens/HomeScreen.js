import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Position from "react-native/Libraries/Components/Touchable/Position";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  auth = getAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>🌸 Welcome to Pet Central!🌸</Text>
      <Text style= {[styles.headerText, styles.headerSpace]}>Manage your fur children here.</Text>

      {/* My pets button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("PetsList")}
        style={[styles.button, styles.buttonOutlinePurple]}
      >
        <Text style={styles.buttonText}>🐾 My pets 🐾</Text>
      </TouchableOpacity>

      {/* Add a pet button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("NewPet")}
        style={[styles.button, styles.buttonOutlinePurple]}
      >
        <Text style={styles.buttonText}>😸 Add a pet 😸</Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity onPress={handleSignOut} style={[styles.buttonLogout, styles.buttonOutlineWhite]}>
        <Text style={styles.buttonTextLogout}>Logout</Text>
      </TouchableOpacity>

      {/* Currently logged in */}
      <Text style={styles.textStyle}>Currently logged in: </Text>
      <Text style={styles.textStyle}>💗{auth.currentUser?.email}</Text>
      
      {/* Logo */}
      <TouchableOpacity style={styles.logoContainer}>
      <View> 
        <Image source={require("../assets/Illustration4.png")} style={styles.logo} />
      </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(223, 231, 253)",
  },
  buttonLogout: {
    backgroundColor: "rgb(205, 218, 253)",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "rgb(205, 218, 253)",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextLogout: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineWhite: {
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
    marginBottom: 30,
},
buttonOutlinePurple: {
    marginTop: 5,
    borderColor: "rgb(205, 218, 253)",
    borderWidth: 2,
},
  headerText: {
    fontSize: 40,
    fontWeight: "700",
    color: "black",
    // fontFamily: "sans-serif",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  headerSpace: {
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    // fontFamily: "Avenir",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    flex: 1,
    width: 50,
    height: 50,
    marginTop: 20,
    resizeMode: 'contain', 
    left: 150,
  },
});