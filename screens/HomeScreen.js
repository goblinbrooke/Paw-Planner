import { NavigationContainer } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handleSignOut = () => {
    const auth = getAuth();
      signOut(auth)
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
}

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchabelOpacity
      onPress={handleSignOut}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchabelOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});