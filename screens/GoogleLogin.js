// import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-community/google-signin';
import GoogleLogin from './screens/GoogleLogin';

const LoginScreen = () => {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    useEffect(() => {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '187624919709-8t278qif6p7r91picbjfbs8of6ovprja.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
    });
    }, [])

    const googleLogin = async () => {
        try {
        await GoogleSignin.hasPlayServices();
        const {accessToken, idToken} = await GoogleSignin.signIn();
        setloggedIn(true);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
              alert('Signin in progress');
              // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert('PLAY_SERVICES_NOT_AVAILABLE');
              // play services not available or outdated
          } else {
              // some other error happened
              console.log("there was an error")
          }
        }
    };

    signOut = async () => {
        try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setloggedIn(false);
        setuserInfo([]);
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header />
    
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={googleLogin}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  {!loggedIn && <Text>You are currently logged out</Text>}
                  {loggedIn && (
                    <Button
                      onPress={signOut}
                      title="LogOut"
                      color="red"></Button>
                  )}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      );
    }

const styles = StyleSheet.create({})

export default GoogleLogin;