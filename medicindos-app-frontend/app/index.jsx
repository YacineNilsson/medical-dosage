import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFBEE",
  },
});

const HomeScreen = () => {
  const { userToken, isLoading } = useAuth();

  // Visa en loader medan tokenstatus laddas
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#015551" />
      </View>
    );
  }

  // Redirecta baserat på om användaren är inloggad
  if (userToken) {
    return <Redirect href="/options" />;
  }

  return <Redirect href="/login" />;
};

export default HomeScreen;
