import { Image, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { vh, vw } from "../utils/units";

export const OnBoard = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {props.check === 1 && (
        <View
          style={{
            width: 100 * vw,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 3,
            marginTop: 10 * vh,
          }}
        >
          <Text
            style={{
              marginVertical: 2 * vh,
              fontSize: 8 * vw,
              color: "#212121",
              fontFamily: "Poppins_500Medium",
            }}
          >
            {props.title}
          </Text>
        </View>
      )}
      {props.check === 2 && (
        <View style={styles.gradient}>
          <View style={styles.box}>
            <Text style={styles.paragraph}>{props.paragraph}</Text>
          </View>
        </View>
      )}
      <LinearGradient
        colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)"]}
        style={styles.grad}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.4)"]}
          style={styles.ox}
        >
          {/* <Text style={styles.title}>{props.title}</Text> */}
        </LinearGradient>
      </LinearGradient>
      <Image source={props.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  gradient: {
    backgroundColor: "#39f",
    alignItems: "center",
    flex: 1,
    height: 100 * vh,
    width: 100 * vw,
    zIndex: 2,
  },
  logo: {
    width: 10 * vh,
    height: 10 * vh,
  },
  box: {
    position: "absolute",
    top: 60 * vh,
    width: 90 * vw,
    height: 30 * vh,
    borderRadius: 5 * vw,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.7)",
    padding: 5 * vw,
    shadowColor: "black",
    // zIndex: 1,
  },
  ox: {
    position: "absolute",
    top: 90 * vh,
    width: 100 * vw,
    height: 10 * vh,
    padding: 5 * vw,
    shadowColor: "black",
    // zIndex: 1,
  },
  grad: {
    backgroundColor: "#39f",
    alignItems: "center",
    flex: 1,
    height: 100 * vh,
    width: 100 * vw,
    zIndex: 2,
  },
  title: {
    marginVertical: 2 * vh,
    fontSize: 7 * vw,
    color: "#f5f5f5",
    fontFamily: "Poppins_500Medium",
  },
  paragraph: {
    fontSize: 5.5 * vw,
    color: "#000",
    opacity: 0.8,
    fontFamily: "Poppins_400Regular",
  },
  image: {
    height: 100 * vh,
    width: 100 * vw,
    // marginTop: 10 * vh,
  },
});
