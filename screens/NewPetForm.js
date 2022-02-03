import React from "react";
import { SafeAreaView, Button, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";

const NewPetForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => console.log(data);

  return (
    <SafeAreaView>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            iconName="person"
            iconType="MaterialIcons"
            placeholder="Enter your name here"
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export default NewPetForm;
