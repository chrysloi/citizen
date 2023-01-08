import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { MAIN_COLOR } from "../../utils";
import { ApprovedInquiries } from "./inquiries/approvedInquiries";
import { NonApprovedInquiries } from "./inquiries/nonApprovedInquiries";

export const Manage = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      style={{ paddingTop: StatusBar.currentHeight }}
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
