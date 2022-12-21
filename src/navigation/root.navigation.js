import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigation";

export const RootNavigator = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);
