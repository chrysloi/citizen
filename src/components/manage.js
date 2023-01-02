import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getValueForToken, MAIN_COLOR } from "../utils";
import { vw } from "../utils/units";
import { TextField } from "./fields";
import { LevelCard } from "./villageComponents/levelCard";
import { GetCells, GetVillages } from "../redux/actions";

export const Manage = () => {
  const dispatch = useDispatch();
  const [loggedInUser, setUser] = useState();
  const {
    login: { user },
    villages: { villages },
    cells: { cells },
  } = useSelector((state) => state);
  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
  }, [user]);
  useEffect(() => {
    if (loggedInUser?.role === "cell") {
      dispatch(GetVillages({ cellId: loggedInUser?.cell?._id }));
    } else {
      dispatch(GetCells({}));
    }
  }, [loggedInUser]);
  console.log(cells);
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
        data={loggedInUser?.role === "cell" ? villages : cells}
        renderItem={({ item }) => {
          return <LevelCard data={item} key={item._id} />;
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
