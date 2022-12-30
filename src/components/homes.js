import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { MAIN_COLOR } from "../utils";
import { ApprovedInquiries } from "./villageComponents/approvedInquiries";
import { NonApprovedInquiries } from "./villageComponents/nonApprovedInquiries";

export const Homes = () => {
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
        name="OfficerReport"
        component={ApprovedInquiries}
        options={{ tabBarLabel: "Resolved inquiries" }}
      />
      <Tab.Screen
        name="FarmerReport"
        component={NonApprovedInquiries}
        options={{ tabBarLabel: "Pending inquiries" }}
      />
    </Tab.Navigator>
  );
};
