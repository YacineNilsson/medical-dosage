import React, { useState } from "react";
import { View, Text, TextInput, Button, Picker } from "react-native";

const DosageForm = () => {
  const [medicine, setMedicine] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = () => {
    //skickar du datan till backend. Ska endpoint och service för kalkylering
    console.log({ medicine, weight, height, age, gender });
    console.log("bara ett test");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Välj medicin:</Text>
      <Picker
        selectedValue={medicine}
        onValueChange={(itemValue) => setMedicine(itemValue)}
      >
        <Picker.Item label="Välj medicin..." value="" />
        <Picker.Item label="Amoxicillin" value="Amoxicillin" />
        <Picker.Item label="Cefotaxime" value="Cefotaxime" />
        {/* Lägg till fler mediciner */}
      </Picker>

      <Text>Skriv in vikt (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Skriv in längd (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Skriv in ålder (år):</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Välj kön:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Välj kön..." value="" />
        <Picker.Item label="Pojke" value="male" />
        <Picker.Item label="Flicka" value="female" />
      </Picker>

      <Button title="Beräkna dos" onPress={handleSubmit} />
    </View>
  );
};

export default DosageForm;
