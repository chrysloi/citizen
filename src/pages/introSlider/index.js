import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { OnBoard } from "../../components/onBoard";
// import { StatusBar } from "expo-status-bar";
import { Slides } from "./slides";
import { useNavigation } from "@react-navigation/native";
import { MAIN_COLOR } from "../../utils";
export const IntroSlider = () => {
  const navigation = useNavigation();
  const onDone = () => {
    navigation.replace("Login");
  };
  const renderItem = ({ item }) => {
    return (
      <OnBoard
        title={item.title}
        paragraph={item.paragraph}
        image={item.image}
        check={item.key}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar style="light" /> */}
      <AppIntroSlider
        indicatorStyle="black"
        doneLabel="Get started"
        activeDotStyle={{ backgroundColor: MAIN_COLOR }}
        dotStyle={{ backgroundColor: "#bee0ed" }}
        data={Slides}
        renderItem={renderItem}
        showDoneButton
        onDone={onDone}
        showSkipButton
      />
    </SafeAreaView>
  );
};
