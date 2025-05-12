import { View, Button } from "react-native";
import OptionsSelector from "../components/OptionsSelector";

const Options = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <OptionsSelector />
    </View>
  );
};

export default Options;
