import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NewInquiry } from "../components/userComponents/newInquiry";
import { ViewInquiry } from "../components/viewInquiry";
import { Screens } from "../pages";
import { getValueForToken } from "../utils";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { isLoggedIn } = useSelector((state) => state.login);

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
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="UserDetails" component={Screens.UserDetails} />
          <Stack.Screen name="NewInquiry" component={NewInquiry} />
          <Stack.Screen name="ViewInquiry" component={ViewInquiry} />
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
