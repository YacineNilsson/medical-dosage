import { View, Button } from "react-native";
import { router } from "expo-router";

const OptionsSelector = () => {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Beräkna dosering"
          onPress={() => router.push("/DosageView")}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button title="Patienter" onPress={() => router.push("/patients")} />
      </View>
    </View>
  );
};

export default OptionsSelector;
