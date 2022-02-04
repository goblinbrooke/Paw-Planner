import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        userData(user);
        console.log("Registered with:", user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const userData = (user) => {
    fetch("https://paw-planner-default-rtdb.firebaseio.com/user.json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        pets: [],
      }),
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Logo */}
      <SafeAreaView style={styles.logoContainer}>
      <View> 
        <Image source={require("../assets/Illustration4.png")} style={styles.logo} />
      </View>
      </SafeAreaView>

      {/* App Name */}
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>Paw Planner</Text>
      </View>

      {/* Email and Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, styles.buttonOutlinePink]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, styles.buttonOutlinePink]}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.buttonOutlineWhite]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutlinePink]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  appNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  appName: {
    fontSize: 70,
    fontWeight: "700",
    color: "rgb(205, 218, 253)",
    fontFamily: "PinkButterfly",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgb(253, 226, 228)",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "rgb(250, 210, 225)",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlinePink: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "rgb(250, 210, 225)",
    borderWidth: 2,
  },
  buttonOutlineWhite: {
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "rgb(250, 210, 225)",
    fontWeight: "700",
    fontSize: 16,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    width: 300,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain' 
  },
});

export default LoginScreen;