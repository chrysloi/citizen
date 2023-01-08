import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { MAIN_COLOR } from "../../utils";
import { ApprovedInquiries } from "./approvedInquiries";
import { NonApprovedInquiries } from "./nonApprovedInquiries";

export const Manage = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: MAIN_COLOR,
        },
        headerTitleStyle: {
          color: "#fff",
        },
        headerTitleAlign: "center",
        headerStatusBarHeight: 30,
        tabBarActiveTintColor: MAIN_COLOR,
        tabBarInactiveTintColor: "grey",
        tabBarIndicatorStyle: {
          backgroundColor: MAIN_COLOR,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_500Medium",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="ApprovedInquiries"
        component={ApprovedInquiries}
        options={{ tabBarLabel: "Resolved inquiries" }}
      />
      <Tab.Screen
        name="NonApprovedInquiries"
        component={NonApprovedInquiries}
        options={{ tabBarLabel: "Pending inquiries" }}
      />
    </Tab.Navigator>
  );
};
