import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DosageForm = () => {
  const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#4CAF50",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

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
      <Text style={styles.label}>Välj medicin:</Text>
      <Picker
        selectedValue={medicine}
        onValueChange={(itemValue) => setMedicine(itemValue)}
      >
        <Picker.Item label="Välj medicin..." value="" />
        <Picker.Item label="Amoxicillin" value="Amoxicillin" />
        <Picker.Item label="Cefotaxime" value="Cefotaxime" />
        {/* Lägg till fler mediciner */}
      </Picker>

      <Text style={styles.label}>Skriv in vikt (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.textInput}
      />

      <Text style={styles.label}>Skriv in längd (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.textInput}
      />

      <Text style={styles.label}>Skriv in ålder (år):</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.textInput}
      />

      <Text style={styles.label}>Välj kön:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Välj kön..." value="" />
        <Picker.Item label="Pojke" value="male" />
        <Picker.Item label="Flicka" value="female" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Beräkna dos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DosageForm;
