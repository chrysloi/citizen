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
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getValueForToken, MAIN_COLOR } from "../../utils";
import { vw } from "../../utils/units";
import { TextField } from "../../components/fields";
import { LevelCard } from "../../components/villageComponents/levelCard";
import {
  GetCells,
  GetVillages,
  DeleteCategory,
  GetCategories,
} from "../../redux/actions";

export const ManageCategories = () => {
  const dispatch = useDispatch();
  const [loggedInUser, setUser] = useState();
  const {
    login: { user },
    villages: { villages },
    cells: { cells },
    categories: { categories, loading },
  } = useSelector((state) => state);

  const onRefresh = () => {
    dispatch(GetCategories({}));
  };

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
    dispatch(GetCategories({}));
  }, [loggedInUser]);
  console.log(categories);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[Style.btn, { marginTop: 15, marginHorizontal: 15 }]}
        // onPress={() => navigation.navigate("AddUser")}
      >
        <TextField value={"Add Category"} marginBottom={0} textColor="#fff" />
      </TouchableOpacity>
      <FlatList
        data={categories}
        onRefresh={onRefresh}
        refreshing={loading}
        renderItem={({ item }) => {
          return (
            <View style={Style.container} key={item._id}>
              <View style={Style.textgr}>
                <TextField
                  value={item.name}
                  fontSize={18}
                  fontFamily="Poppins_500Medium"
                  marginBottom={0}
                />
                <icons.AntDesign
                  name="delete"
                  size={20}
                  color={"red"}
                  onPress={() => {
                    dispatch(DeleteCategory(item._id));
                    onRefresh();
                  }}
                />
              </View>
              <TextField
                value={item.description}
                fontSize={15}
                marginBottom={0}
              />
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    marginHorizontal: vw * 2,
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
  },
  textgr: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: vw * 90,
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
