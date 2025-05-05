import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const CustomDoseForm = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
    },
    inputField: {
      borderWidth: 1,
      borderColor: "#57B4BA",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      backgroundColor: "#fff",
    },
    picker: {
      borderWidth: 1,
      borderColor: "#57B4BA",
      borderRadius: 8,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#015551",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
    },
  });

  const [medicine, setMedicine] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = () => {
    console.log(medicine, weight, age, gender, height);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Välj beräkningsmetod</Text>
      <Picker
        selectedValue={medicine}
        style={styles.picker}
        onValueChange={(itemValue) => setMedicine(itemValue)}
      >
        <Picker.Item label="Välj metod..." value="" />
        <Picker.Item label="Viktbaserad" value="Viktbaserad" />
        <Picker.Item label="BSA - Mosteller" value="BSA - Mosteller" />
        <Picker.Item label="BSA - Du Bois" value="BSA - Du Bois" />
        {/* Lägg till fler mediciner */}
      </Picker>

      <Text style={styles.sectionTitle}>Fyll i information</Text>
      <Text>Skriv in vikt (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.inputField}
      />

      <Text>Skriv in längd (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.inputField}
      />

      <Text>Skriv in ålder (år):</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.inputField}
      />

      <Text style={styles.sectionTitle}>Välj kön</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
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

export default CustomDoseForm;
