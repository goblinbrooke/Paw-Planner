import React from "react";
import {
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const NewPetForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    fetch(
      "https://paw-planner-default-rtdb.firebaseio.com/user/123/pets.json",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Add a new pet!</Text>
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
      <Button
        style={[styles.button, styles.buttonText]}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
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
