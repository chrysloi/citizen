import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

export const Chart = ({ resolved = [], inquiries = [] }) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const leftToSpendAmount = resolved.length;
  const targetAmount = inquiries.length;

  const spentAmount = targetAmount - leftToSpendAmount;
  const percentage = (spentAmount / targetAmount) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="120" width="120" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#F1F6F9"
              fill="transparent"
              strokeWidth="40"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#14274E"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <Text style={styles.text}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    color: "#394867",
  },
});
