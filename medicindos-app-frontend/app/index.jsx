import { Text, View, StyleSheet } from "react-native";
import DosageForm from "./Components/DosageForm";
import DosageScreen from "./Components/DosageScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFBEE",
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <DosageScreen />
    </View>
  );
};

export default HomeScreen;
