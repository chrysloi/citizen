import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as icons from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UIActivityIndicator } from "react-native-indicators";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { vh, vmax, vw } from "../../utils/units";
import { BASE_URL, MAIN_COLOR, storeToken } from "../../utils";
import {
  GetCells,
  GetVillages,
  RegisterUser,
  resetRegister,
} from "../../redux/actions";
import { Input } from "../../components/fields";
import { Notify } from "../../utils/notification";

const initialData = {
  name: "",
  phone: "",
  email: "",
  password: "",
  village: "",
  cell: "",
};

export const Register = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(true);
  const [creds, setCreds] = useState(initialData);
  const [cellValue, setCellValue] = useState();
  const [villageValue, setVillageValue] = useState();

  const {
    cells: { cells, loading: gettingCells },
    villages: { villages, loading: gettingVillages },
    register: { isRegistered, error },
  } = state;

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  useEffect(() => {
    dispatch(GetCells());
    dispatch(GetVillages({}));
  }, []);
  const validate = () => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    const phoneRegex = new RegExp(/^(078|072|073|079)\d{7}$/);
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (creds.name === "") return Notify({ message: "Name is required" });
    if (creds.phone === "") return Notify({ message: "Phone is required" });
    if (phoneRegex.test(creds.phone) !== true) {
      return Notify({
        message:
          "Your phone number isn't valid. it should contain 10 digits and starts with 079 or 078 or 073 or 072",
      });
    }
    if (creds.email !== "" && emailRegex.test(creds.email) !== true) {
      return Notify({
        message: "Your email should respect this format 'email@example.com'",
      });
    }
    if (creds.village === "") return Notify({ message: "Village is required" });
    if (creds.cell === "") return Notify({ message: "Cell is required" });
    if (creds.password === "")
      return Notify({ message: "Password is required" });
    if (regex.test(creds.password) !== true) {
      return Notify({
        message:
          "your password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number",
      });
    }
    dispatch(RegisterUser(creds));
  };

  const togglePassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleRegister = () => {
    validate();
  };
  if (isRegistered) {
    Notify({
      message: "You've been Registered",
      onPress: () => {
        navigation.navigate("Login");
        dispatch(resetRegister());
      },
    });
  }
  if (error) {
    // console.log(error);
    Notify({
      message: error,
      onPress: () => {
        dispatch(resetRegister());
      },
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      {!cells && !villages ? (
        <View style={{ flex: 1 }}>
          <UIActivityIndicator color={MAIN_COLOR} size={50} />
        </View>
      ) : (
        <KeyboardAwareScrollView style={styles.container}>
          <Text style={styles.title}>Create your account</Text>
          <Input
            label="Full name"
            value={creds.name}
            onChangeText={(text) => handlerChange("name", text)}
            placeholder="Full Name"
          />

          <Input
            label="Phone"
            value={creds.phone}
            onChangeText={(text) => handlerChange("phone", text)}
            placeholder="0787000000"
            keyboardType="numeric"
          />

          <Input
            label="Email"
            value={creds.email}
            onChangeText={(text) => handlerChange("email", text)}
            placeholder="mail@example.com"
            keyboardType="email-address"
          />

          <Input
            label="cell"
            picker={true}
            toPicker={
              <Picker
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

          <Input
            label="Password"
            value={creds.password}
            onChangeText={(text) => handlerChange("password", text)}
            placeholder="Create password"
            secureTextEntry={viewPassword}
            icon={
              viewPassword ? (
                <icons.Entypo
                  name="eye-with-line"
                  size={24}
                  color={MAIN_COLOR}
                  onPress={togglePassword}
                />
              ) : (
                <icons.Entypo
                  name="eye"
                  size={24}
                  color={MAIN_COLOR}
                  onPress={togglePassword}
                />
              )
            }
          />

          {loading ? (
            <View style={styles.loading}>
              <UIActivityIndicator color={MAIN_COLOR} size={30} />
            </View>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.signIn}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={{ opacity: 0.5, fontFamily: "Poppins_400Regular" }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: 5 * vw,
  },
  title: {
    fontSize: 12 * vw,
    fontWeight: "400",
    lineHeight: 7.5 * vh,
    marginBottom: 4 * vh,
    fontFamily: "Poppins_500Medium",
  },
  button: {
    backgroundColor: MAIN_COLOR,
    width: 80 * vw,
    borderRadius: 20,
    height: 7 * vh,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 2 * vh,
  },
  signIn: {
    color: "#fff",
    fontSize: 4.5 * vw,
    fontFamily: "Poppins_400Regular",
  },
  signUp: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10 * vh,
  },
});
