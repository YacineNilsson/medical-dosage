import { Text, View, StyleSheet } from "react-native";
import DosageForm from "./DosageForm";

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
      <DosageForm />
    </View>
  );
};

export default HomeScreen;
