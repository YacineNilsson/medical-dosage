// components/LoginForm.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useAuth } from "../context/AuthContext"; // ändra sökvägen om det behövs

export default function LoginForm() {
  const { login } = useAuth(); // Använder login-funktionen från AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Varning", "Fyll i både användarnamn och lösenord");
      return;
    }

    await login(username, password);
    // Du behöver inte hantera token här – det sköts i contextet.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in</Text>
      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Logga in" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
});
