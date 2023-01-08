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
  Modal,
} from "react-native";
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { getValueForToken, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { Input, TextField } from "../../components/fields";
import {
  GetCells,
  GetVillages,
  GetUsers,
  UpdateUser,
} from "../../redux/actions";
// import { LevelCard } from "../../components/villageComponents/levelCard";

export const ManageUsers = () => {
  const dispatch = useDispatch();
  const [loggedInUser, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [viewUser, setViewUser] = useState({});
  const [cellValue, setCellValue] = useState();
  const [villageValue, setVillageValue] = useState();
  const [userModal, setUserModal] = useState(false);
  const {
    login: { user },
    users: { users, loading },
    cells: { cells },
    villages: { villages },
  } = useSelector((state) => state);
  const handlerViewUser = (item) => {
    Promise.resolve(setViewUser(item)).then(() => {
      setUserModal(!userModal);
    });
  };
  const onRefresh = () => {
    dispatch(GetUsers({}));
  };
  const handlerChange = (key, value) => {
    setViewUser((prevCred) => ({ ...prevCred, [key]: value }));
  };
  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
    dispatch(GetUsers({}));
  }, []);
  // useEffect(() => {
  // }, []);
  useEffect(() => {
    if (viewUser?.cell) {
      setCellValue(viewUser?.cell);
    }
    if (viewUser?.village) {
      setVillageValue(viewUser?.village);
    }
  }, [viewUser]);
  //   console.log(creds);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[Style.btn, { marginTop: 15, marginHorizontal: 15 }]}
        // onPress={() => navigation.navigate("AddUser")}
      >
        <TextField value={"Add user"} marginBottom={0} textColor="#fff" />
      </TouchableOpacity>
      <FlatList
        data={users.filter((user) => user.phone !== loggedInUser?.phone)}
        onRefresh={onRefresh}
        refreshing={loading}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={Style.container}
              key={item._id}
              onPress={() => handlerViewUser(item)}
            >
              <View>
                <View style={Style.textgr}>
                  <TextField
                    value={item.name}
                    fontSize={18}
                    fontFamily="Poppins_500Medium"
                    marginBottom={0}
                  />
                </View>
                <TextField
                  value={item.email && item.email}
                  fontSize={15}
                  marginBottom={0}
                />
                <TextField value={item.phone} fontSize={15} marginBottom={0} />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <Modal visible={userModal} transparent>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              paddingHorizontal: vw * 3,
              paddingTop: vh * 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                value="Edit user"
                marginBottom={0}
                fontSize={18}
                fontFamily="Poppins_500Medium"
              />
              {edit ? (
                <TextField
                  value="Done"
                  marginBottom={0}
                  fontSize={18}
                  onPress={() => {
                    setEdit(!edit);
                    dispatch(UpdateUser(viewUser));
                  }}
                />
              ) : (
                <icons.Feather
                  name="edit"
                  size={18}
                  style={{ marginStart: vw * 2 }}
                  onPress={() => {
                    setEdit(!edit);
                  }}
                />
              )}
            </View>
            <Input
              editable={edit}
              label="Name"
              value={viewUser?.name}
              onChangeText={(value) => handlerChange("name", value)}
            />
            <Input
              editable={edit}
              label="Email"
              value={viewUser?.email}
              onChangeText={(value) => handlerChange("email", value)}
            />
            <Input
              editable={edit}
              label="Phone"
              value={viewUser?.phone}
              onChangeText={(value) => handlerChange("phone", value)}
            />
            <Input
              editable={edit}
              label="User Role"
              value={viewUser?.role}
              onChangeText={(value) => handlerChange("role", value)}
            />
            <Input
              label="Cell"
              picker={true}
              toPicker={
                <Picker
                  enabled={edit}
                  selectedValue={cellValue}
                  onValueChange={(itemValue, itemIndex) => {
                    setCellValue(itemValue);
                    handlerChange("cell", itemValue?._id);
                    dispatch(GetVillages({ cellId: itemValue?._id }));
                  }}
                >
                  {cells.map((cell, idx) => (
                    <Picker.Item label={cell.name} value={cell} key={idx} />
                  ))}
                </Picker>
              }
            />
            <Input
              label="Village"
              picker={true}
              toPicker={
                <Picker
                  enabled={edit}
                  selectedValue={villageValue}
                  onValueChange={(itemValue, itemIndex) => {
                    handlerChange("village", itemValue?._id);
                    setVillageValue(itemValue);
                  }}
                >
                  {villages.map((village, idx) => (
                    <Picker.Item
                      label={village.name}
                      value={village}
                      key={idx}
                    />
                  ))}
                </Picker>
              }
            />
            <TouchableOpacity
              style={[Style.btn, { marginTop: 15, marginHorizontal: 15 }]}
              onPress={() => {
                setUserModal(!userModal);
                setViewUser({});
              }}
            >
              <TextField value={"Close"} marginBottom={0} textColor="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  textgr: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
