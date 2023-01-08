import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as icons from "@expo/vector-icons";
import { getValueForToken, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../../components/fields";
// import { LevelCard } from "../../components/villageComponents/levelCard";
import { GetCells, GetVillages, GetUsers } from "../../redux/actions";
import { ManageUsers } from "./manageUsers";
import { ManageCategories } from "./manageCategories";
import { Statistics } from "./statistics";

const adminOptions = ["Manage Categories", "Manage users", "Statistics"];

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const [option, setOption] = useState(adminOptions[0]);

  const handlerModal = () => setModal(!showModal);
  const handlerOptions = (opt) =>
    Promise.resolve(setOption(opt)).then((res) => {
      setModal(!showModal);
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Style.header}>
        <TextField
          value={option}
          marginBottom={0}
          fontFamily="Poppins_500Medium"
          fontSize={18}
        />
        <TouchableOpacity onPress={handlerModal}>
          <icons.Ionicons name="options" size={20} />
        </TouchableOpacity>
        {showModal && (
          <View style={Style.modal}>
            {adminOptions.map((option) => {
              return (
                <TouchableOpacity onPress={() => handlerOptions(option)}>
                  <TextField value={option} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
      {option === "Manage Categories" && <ManageCategories />}
      {option === "Manage users" && <ManageUsers />}
      {option === "Statistics" && <Statistics />}
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 3 * vw,
    paddingBottom: 2 * vh,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  modal: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    position: "absolute",
    top: StatusBar.currentHeight + 25,
    right: vw * 2,
    paddingHorizontal: vw * 2,
    paddingTop: vh * 2,
    borderRadius: 10,
    borderColor: "whitesmoke",
    borderWidth: 2,
    backgroundColor: "#fff",
    zIndex: 1,
    shadowOpacity: 0.2,
  },
  optionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textTransform: "capitalize",
    marginVertical: 1,
    color: "#999",
  },
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
