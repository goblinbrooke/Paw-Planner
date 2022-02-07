import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  ScrollView,
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "./UploadImage";

const NewPetForm = () => {
  // state variables
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onBlur" });

  const [image, setImage] = useState(null);

  const [species, setSpecies] = useState(null);

  const onSubmit = (data) => {
    const newData = { ...data, image, species };
    fetch(
      "https://paw-planner-default-rtdb.firebaseio.com/user/123/pets.json",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    reset();
    setImage(null);
    setSpecies(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Add a new pet!</Text>
      <ScrollView>
        <UploadImage image={image} setImage={setImage} />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              iconName="person"
              iconType="MaterialIcons"
              placeholder="Enter pet name"
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet age"
              keyboardType="numeric"
            />
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              autoComplete="birthdate-day"
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet birthday"
            />
          )}
        />
        <View>
          <Text>Pet species</Text>
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> cat</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("cat");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> dog</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("dog");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> bird</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("bird");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> small rodent</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("small rodent");
            }}
          />
          <BouncyCheckbox
            fillColor="#BEE1E6"
            textComponent={<Text> fish</Text>}
            onPress={(isChecked = boolean) => {
              setSpecies("fish");
            }}
          />
        </View>
        <Controller
          control={control}
          name="breed"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet breed"
            />
          )}
        />
        <Controller
          control={control}
          name="coloring"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet coloring"
            />
          )}
        />
        <Controller
          control={control}
          name="microchip"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet microchip number"
              keyboardType="numeric"
            />
          )}
        />
        <Controller
          control={control}
          name="dietary needs"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Enter pet dietary needs"
            />
          )}
        />
        {/* <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}
        <Button
          style={[styles.button, styles.buttonText]}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPetForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
