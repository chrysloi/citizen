import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Screens } from "../pages";
import * as icons from "@expo/vector-icons";
import { getUserId, getValueForToken, MAIN_COLOR } from "../utils";
import { useEffect, useState } from "react";
import { GetUsers } from "../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    users: { users },
  } = state;
  useEffect(() => {
    if (user) dispatch(GetUsers({ userId: user._z }));
  }, [user]);
  useEffect(() => {
    setUser(getUserId());
  }, []);
  console.log(users);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerBackground: "white",
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Poppins_500Medium",
        },
        headerTitleAlign: "center",
        headerStatusBarHeight: 30,
        tabBarActiveTintColor: MAIN_COLOR,
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.Login}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <icons.FontAwesome5 name="indent" color={color} size={size} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Screens.Profile}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <icons.FontAwesome5 name="indent" color={color} size={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
