import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default RootLayout;
