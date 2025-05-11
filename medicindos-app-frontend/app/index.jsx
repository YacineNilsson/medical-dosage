import { StyleSheet } from "react-native";
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
  const { userToken } = useAuth();

  if (userToken) {
    return <Redirect href="/DosageView" />;
  }
  return <Redirect href="/login" />;
};

export default HomeScreen;
