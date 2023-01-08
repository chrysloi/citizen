import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getValueForToken } from "../../utils";
import jwtDecode from "jwt-decode";
import { vw } from "../../utils/units";

export const UserDetails = () => {
  const [loggedInUser, setUser] = React.useState({});
  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.text]}>Names: </Text>
        <Text style={[styles.cardContent, styles.text]}>
          {loggedInUser.name}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.text]}>Email: </Text>
        <Text style={[styles.cardContent, styles.text]}>
          {loggedInUser.email}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.text]}>Phone: </Text>
        <Text style={[styles.cardContent, styles.text]}>
          {loggedInUser.phone}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.text]}>Cell: </Text>
        <Text style={[styles.cardContent, styles.text]}>
          {loggedInUser.cell?.name}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.text]}>Village: </Text>
        <Text style={[styles.cardContent, styles.text]}>
          {loggedInUser.village?.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: vw * 2,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
});
