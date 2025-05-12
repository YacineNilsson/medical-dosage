import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDoseCalculation } from "../hooks/useDoseCalculation";

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
  const [defaultDosePerKgPerDay, setDefaultDosePerKgPerDay] = useState("");
  const [defaultDosePerM2PerDay, setDefaultDosePerM2PerDay] = useState("");
  const [maxDose, setMaxDose] = useState("");

  const { result, loading, error, calculateDose } = useDoseCalculation();

  const handleSubmit = () => {
    const requestData = {
      useCustomValues: true,
      weight: parseFloat(weight),
      height: parseFloat(height),
      calculationMethod,
      defaultDosePerKgPerDay: parseFloat(defaultDosePerKgPerDay) || null,
      defaultDosePerM2PerDay: parseFloat(defaultDosePerM2PerDay) || null,
      maxDose: parseFloat(maxDose) || null,
      medicineName: medicine,
      unit: "mg", // detta kan du göra valbart om du vill
    };

    calculateDose(requestData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Välj beräkningsmetod</Text>
      <Picker
        selectedValue={calculationMethod}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setCalculationMethod(itemValue);
        }}
      >
        <Picker.Item label="Välj metod..." value="" />
        <Picker.Item label="Viktbaserad" value="weight" />
        <Picker.Item label="BSA - Mosteller" value="bsa" />
        <Picker.Item label="BSA - Du Bois" value="bsa" />
      </Picker>

      <Text style={styles.sectionTitle}>Fyll i information</Text>

      <Text>Maxdos per dag</Text>
      <TextInput
        value={maxDose}
        onChangeText={setMaxDose}
        style={styles.inputField}
      />

      {/* Normaldos per kg – visas bara vid viktbaserad metod */}
      {calculationMethod === "weight" && (
        <>
          <Text>Normaldos per kg/dag</Text>
          <TextInput
            value={defaultDosePerKgPerDay}
            onChangeText={setDefaultDosePerKgPerDay}
            style={styles.inputField}
          />
        </>
      )}

      {/* Normaldos per m2 – visas bara vid BSA */}
      {calculationMethod === "bsa" && (
        <>
          <Text>Normaldos per m2/dag</Text>
          <TextInput
            value={defaultDosePerM2PerDay}
            onChangeText={setDefaultDosePerM2PerDay}
            style={styles.inputField}
          />
          <Text>Längd (cm):</Text>
          <TextInput
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            style={styles.inputField}
          />
        </>
      )}

      <Text>Vikt (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
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
          <Text>
            Rekommenderad dos för medicinen: {result.calculatedDose}{" "}
            {result.unit}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CustomDoseForm;
