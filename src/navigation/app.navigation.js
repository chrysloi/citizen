import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NewInquiry } from "../components/userComponents/newInquiry";
import { Screens } from "../pages";
import { getValueForToken } from "../utils";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user } = useSelector((state) => state.login);
  console.log(user);
  const [token, setToken] = useState();
  useEffect(() => {
    getValueForToken().then((res) => {
      setToken(res);
    });
  }, []);
  console.log(token);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Poppins_500Medium",
        },
        headerTitleAlign: "center",
        headerStatusBarHeight: 30,
      }}
    >
      {user.token ? (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="UserDetails" component={Screens.UserDetails} />
          <Stack.Screen name="NewInquiry" component={NewInquiry} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.Login} />
          <Stack.Screen name="Register" component={Screens.Register} />
        </>
      )}
    </Stack.Navigator>
  );
};
