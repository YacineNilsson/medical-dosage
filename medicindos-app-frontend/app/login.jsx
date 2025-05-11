import { View } from "react-native";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const login = () => {
  return (
    <View>
      <LoginForm />
      <RegisterForm />
    </View>
  );
};

export default login;
