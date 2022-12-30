// import React from "react";

// export const Manage = () => {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         paddingTop: StatusBar.currentHeight,
//         backgroundColor: "#fff",
//       }}
//     >
//       <Tab.Navigator
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: MAIN_COLOR,
//           },
//           headerTitleStyle: {
//             color: "#fff",
//           },
//           headerTitleAlign: "center",
//           headerStatusBarHeight: 30,
//           tabBarActiveTintColor: MAIN_COLOR,
//           tabBarInactiveTintColor: "grey",
//           tabBarIndicatorStyle: {
//             backgroundColor: MAIN_COLOR,
//           },
//           tabBarLabelStyle: {
//             fontFamily: "Poppins_500Medium",
//             fontSize: 12,
//           },
//         }}
//       >
//         <Tab.Screen
//           name="OfficerReport"
//           component={ApprovedInquiries}
//           options={{ tabBarLabel: "Resolved inquiries" }}
//         />
//         <Tab.Screen
//           name="FarmerReport"
//           component={NonApprovedInquiries}
//           options={{ tabBarLabel: "Pending inquiries" }}
//         />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };
