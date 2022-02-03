import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";

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
      <Text>Logged in: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("PetsList")}
        style={[styles.button, styles.buttonOutlinePurple]}
      >
        <Text style={styles.buttonText}>My pets</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewPet")}
        style={[styles.button, styles.buttonOutlinePurple]}
      >
        <Text style={styles.buttonText}>Add a pet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={[styles.buttonLogout, styles.buttonOutlineWhite]}>
        <Text style={styles.buttonTextLogout}>Logout</Text>
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
},
buttonOutlinePurple: {
    marginTop: 5,
    borderColor: "rgb(205, 218, 253)",
    borderWidth: 2,
}
});