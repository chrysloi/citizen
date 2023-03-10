import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Screens } from "../pages";
import * as icons from "@expo/vector-icons";
import { getValueForToken, MAIN_COLOR } from "../utils";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
// import { Homes } from "../components.js/homes";

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const { isLoggedIn, user } = useSelector((state) => state.login);
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   getValueForToken().then((res) => {
  //     setUser(jwtDecode(res).user);
  //   });
  // }, []);
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
        tabBarLabelStyle: {
          fontFamily: "Poppins_500Medium",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={
          user?.user?.role === "user" ? Screens.UserHome : Screens.Manage
        }
        options={{
          tabBarIcon: ({ size, color }) => {
            return <icons.FontAwesome5 name="home" color={color} size={size} />;
          },
        }}
      />
      {user?.user?.role === "sector" && (
        <Tab.Screen
          name="Admin"
          component={Screens.AdminPanel}
          options={{
            tabBarIcon: ({ size, color }) => {
              return (
                <icons.MaterialIcons
                  name="admin-panel-settings"
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={Screens.Profile}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <icons.FontAwesome5 name="user" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
