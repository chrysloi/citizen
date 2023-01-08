import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { NewInquiry } from "../components.js/userComponents/newInquiry";
// import { ViewInquiry } from "../components.js/viewInquiry";
import { Screens } from "../pages";
import { getValueForToken } from "../utils";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { isLoggedIn, user } = useSelector((state) => state.login);

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
      <Stack.Screen name="Login" component={Screens.Login} />
      <Stack.Screen name="Register" component={Screens.Register} />
      {user && (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="UserDetails" component={Screens.UserDetails} />
          <Stack.Screen name="NewInquiry" component={Screens.NewInquiry} />
          <Stack.Screen name="ViewInquiry" component={Screens.ViewInquiry} />
        </>
      )}
    </Stack.Navigator>
  );
};
