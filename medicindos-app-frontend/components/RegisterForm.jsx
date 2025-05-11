import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        Alert.alert("Registrering lyckades!");
        setUsername("");
        setPassword("");
      } else {
        const errorText = await response.text();
        Alert.alert("Registrering misslyckades", errorText);
      }
    } catch (error) {
      console.error("Fel vid registrering:", error);
      Alert.alert("Ett tekniskt fel uppstod");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Lösenord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Registrera" onPress={handleRegister} />
    </View>
  );
};

export default RegisterForm;
