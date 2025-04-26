import { Text, View, StyleSheet } from "react-native";
import DosageForm from "./DosageForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <DosageForm />
    </View>
  );
};

export default HomeScreen;
