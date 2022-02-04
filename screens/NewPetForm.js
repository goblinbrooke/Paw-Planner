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

const NewPetForm = () => {
  // state variables
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
      <ScrollView>
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
          <Controller
            control={control}
            name="cat"
            render={({ field: { onChange, value, onBlur } }) => (
              <BouncyCheckbox
                textComponent={<Text> cat</Text>}
                onPress={(isChecked = boolean) => {}}
              />
            )}
          />
          <Controller
            control={control}
            name="dog"
            render={({ field: { onChange, value, onBlur } }) => (
              <BouncyCheckbox
                textComponent={<Text> dog</Text>}
                onPress={(isChecked = boolean) => {}}
              />
            )}
          />
          <Controller
            control={control}
            name="bird"
            render={({ field: { onChange, value, onBlur } }) => (
              <BouncyCheckbox
                textComponent={<Text> bird</Text>}
                onPress={(isChecked = boolean) => {}}
              />
            )}
          />
          <Controller
            control={control}
            name="small rodent"
            render={({ field: { onChange, value, onBlur } }) => (
              <BouncyCheckbox
                textComponent={<Text> small rodent</Text>}
                onPress={(isChecked = boolean) => {}}
              />
            )}
          />
          <Controller
            control={control}
            name="fish"
            render={({ field: { onChange, value, onBlur } }) => (
              <BouncyCheckbox
                textComponent={<Text> fish</Text>}
                onPress={(isChecked = boolean) => {}}
              />
            )}
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
