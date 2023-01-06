import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Homes } from "../../components/homes";
import { Manage } from "../../components/manage";
import { UserHome } from "../../components/userComponents/home";
import { ApprovedInquiries } from "../../components/villageComponents/approvedInquiries";
import { NonApprovedInquiries } from "../../components/villageComponents/nonApprovedInquiries";
import { GetInquiries } from "../../redux/actions";

import { getValueForToken, MAIN_COLOR } from "../../utils";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    login: { user, isLoggedIn },
  } = useSelector((state) => state);
  const [loggedInUser, setUser] = useState({});
  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
    dispatch(GetInquiries({}));
  }, [user]);
  // console.log(loggedInUser);
  if (loggedInUser?.role !== "user") {
    const Tab = createMaterialTopTabNavigator();
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
        }}
      >
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
      </SafeAreaView>
    );
  }
  return (
    isLoggedIn && (
      <View style={{ flex: 1 }}>
        {loggedInUser?.role === "user" && <UserHome />}
      </View>
    )
  );
};
