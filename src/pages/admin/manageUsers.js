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
  Alert,
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
import { useNavigation } from "@react-navigation/native";
// import { LevelCard } from "../../components/villageComponents/levelCard";

const roles = ["user", "village", "cell", "admin"];

export const ManageUsers = () => {
  const navigation = useNavigation();
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
    if (viewUser) {
      setCellValue(viewUser?.cell);
      setVillageValue(viewUser?.village);
    }
  }, []);
  //   console.log(creds);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[Style.btn, { marginTop: 15, marginHorizontal: 15 }]}
        onPress={() => navigation.navigate("NewUser")}
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
      <Modal visible={userModal} transparent style={{ flex: 1 }}>
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
                <TouchableOpacity
                  onPress={() => {
                    setEdit(!edit);
                    dispatch(UpdateUser(viewUser));
                  }}
                >
                  <TextField value="Done" marginBottom={0} fontSize={18} />
                </TouchableOpacity>
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
              // value={}
              picker={true}
              toPicker={
                <Picker
                  enabled={edit}
                  selectedValue={viewUser?.role}
                  onValueChange={(itemValue) => {
                    handlerChange("role", itemValue);
                  }}
                >
                  {roles.map((role, idx) => (
                    <Picker.Item label={role} value={role} key={idx} />
                  ))}
                </Picker>
              }
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
                  {villages
                    .filter((village) => village.cell?._id === cellValue?._id)
                    .map((village, idx) => (
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
                if (edit) {
                  Alert.alert(
                    undefined,
                    "Do you want to close without saving?",
                    [
                      {
                        text: "Yes",
                        onPress: () => {
                          setEdit(!edit);
                          setUserModal(!userModal);
                          setViewUser({});
                        },
                      },
                      {
                        text: "No",
                        style: "cancel",
                      },
                    ]
                  );
                } else {
                  setUserModal(!userModal);
                  setViewUser({});
                }
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
