import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { getValueForToken, MAIN_COLOR } from "../utils";
import { vw } from "../utils/units";
import { TextField } from "./fields";
import { InquiryCard } from "./userComponents/inquiryCard";
import { LevelCard as VillageCard } from "./villageComponents/levelCard";

export const Manage = () => {
  const [loggedInUser, setUser] = useState();
  const {
    login: { user },
  } = useSelector((state) => state);
  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
  }, [user]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[Style.btn, { marginTop: 15, marginHorizontal: 15 }]}
        // onPress={() => navigation.navigate("AddUser")}
      >
        <TextField
          value={loggedInUser?.role === "cell" ? "Add village" : "Add cell"}
          marginBottom={0}
          textColor="#fff"
        />
      </TouchableOpacity>
      <FlatList
        data={[
          { key: 1, name: "data" },
          { key: 2, name: "data" },
          { key: 3, name: "data" },
        ]}
        renderItem={({ item }) => {
          return <VillageCard inquiry={item} key={item.key} />;
        }}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: MAIN_COLOR,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    minWidth: vw * 30,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
  },
});
