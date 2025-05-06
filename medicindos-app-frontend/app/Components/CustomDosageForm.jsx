import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDoseCalculation } from "../Hooks/useDoseCalculation";

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
  const [calculationMethod, setCalculationMethod] = useState("");

  const { result, loading, error, calculateDose } = useDoseCalculation();

  const handleSubmit = () => {
    const requestData = {
      useCustomValues: true,
      weight: parseFloat(weight),
      height: parseFloat(height),
      calculationMethod: medicine === "Viktbaserad" ? "weight" : "bsa",
      medicineName: medicine, // t.ex. "Amoxicillin" eller "BSA - Mosteller"
      unit: "mg", // detta kan du göra valbart om du vill
      normalDosePerKgPerDay: medicine === "Viktbaserad" ? 50 : null,
      normalDosePerM2PerDay: medicine !== "Viktbaserad" ? 800 : null,
      maxDose: 3000, // valfritt, justera efter behov
    };

    calculateDose(requestData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Välj beräkningsmetod</Text>
      <Picker
        selectedValue={calculationMethod}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setCalculationMethod(itemValue);
          setMedicine(
            itemValue === "weight-based" ? "Viktbaserad" : "BSA - Mosteller"
          );
        }}
      >
        <Picker.Item label="Välj metod..." value="" />
        <Picker.Item label="Viktbaserad" value="weight-based" />
        <Picker.Item label="BSA - Mosteller" value="bsa" />
        <Picker.Item label="BSA - Du Bois" value="bsa" />
      </Picker>

      <Text style={styles.sectionTitle}>Fyll i information</Text>

      <Text>Medicinens namn:</Text>
      <TextInput
        value={medicine}
        onChangeText={setMedicine}
        style={styles.inputField}
      />

      <Text>Vikt (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.inputField}
      />

      <Text>Längd (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.inputField}
      />

      <Text>Ålder (år):</Text>
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
        <Text style={styles.buttonText}>
          {loading ? "Beräknar..." : "Beräkna dos"}
        </Text>
      </TouchableOpacity>

      {/* Visa felmeddelande om något går fel */}
      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>Fel: {error}</Text>
      )}

      {/* Visa resultat om det finns */}
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Resultat</Text>
          <Text>Total dos per dag: {result.totalDosePerDay} mg</Text>
          <Text>Antal doser per dag: {result.dosesPerDay}</Text>
          <Text>Enkel dos: {result.singleDose} mg</Text>
          <Text>
            Eventuell maxdos: {result.maxDoseExceeded ? "Överskriden" : "OK"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomDoseForm;
