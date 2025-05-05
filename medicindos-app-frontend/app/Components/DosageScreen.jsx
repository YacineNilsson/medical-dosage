import { useState } from "react";
import { Button, View, Text } from "react-native";
import DosageForm from "./DosageForm";
import CustomDoseForm from "./CustomDosageForm";

const DosageScreen = () => {
  const [useCustom, setUseCustom] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={
          useCustom ? "Byt till medicin från lista" : "Byt till egna dosvärden"
        }
        onPress={() => setUseCustom(!useCustom)}
      />

      {useCustom ? <CustomDoseForm /> : <DosageForm />}
    </View>
  );
};

export default DosageScreen;
