import { Alert } from "react-native";

export const Notify = ({ message = "", onPress = () => {} }) =>
  Alert.alert(undefined, message, [
    {
      text: "OK",
      onPress: onPress,
    },
  ]);
