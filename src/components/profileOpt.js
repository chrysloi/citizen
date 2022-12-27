import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as icons from "@expo/vector-icons";

export const ProfileOpt = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.navigate}>
      {props.icon}
      <View style={styles.details}>
        <Text style={{ fontSize: 18, fontFamily: "Poppins_400Regular" }}>
          {props.title}
        </Text>
        <Text
          style={{
            opacity: 0.5,
            fontSize: 15,
            fontFamily: "Poppins_400Regular",
          }}
        >
          {props.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    marginStart: 10,
  },
});
