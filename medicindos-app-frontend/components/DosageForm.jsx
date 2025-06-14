import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useMedicines } from "../hooks/useMedicines";

import { useDoseCalculation } from "../hooks/useDoseCalculation";

const DosageForm = () => {
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

  const {
    medicines,
    loading: loadingMedicines,
    error: errorMedicines,
  } = useMedicines();

  const { result, loading, error, calculateDose } = useDoseCalculation();

  const handleSubmit = () => {
    const requestData = {
      useCustomValues: false,
      medicineId: medicine,
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
      gender,
    };

    calculateDose(requestData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Välj medicin</Text>
      <Picker
        selectedValue={medicine}
        style={styles.picker}
        onValueChange={(itemValue) => setMedicine(itemValue)}
      >
        <Picker.Item label="Välj medicin..." value="" />
        {medicines.map((med) => (
          <Picker.Item key={med.id} label={med.name} value={med.id} />
        ))}
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

      {/* Visa felmeddelande om något går fel */}
      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>Fel: {error}</Text>
      )}

      {/* Visa resultat om det finns */}
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Resultat</Text>
          <Text>
            Rekommenderad dos för {result.medicineName}: {result.calculatedDose}{" "}
            {result.unit}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DosageForm;
