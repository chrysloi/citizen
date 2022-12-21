import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { vh, vmax, vw } from "../../utils/units";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UIActivityIndicator } from "react-native-indicators";
import { BASE_URL, MAIN_COLOR, storeToken } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { GetCells, GetVillages } from "../../redux/actions";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

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
  const [creds, setCreds] = useState(initialData);
  const [cellValue, setCellValue] = useState();
  const [villageValue, setVillageValue] = useState();

  const {
    cells: { cells },
    villages: { villages },
  } = state;

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  useEffect(() => {
    dispatch(GetCells());
    dispatch(GetVillages({}));
  }, []);
  const validate = () => {
    if (
      creds.name === "" &&
      creds.phone === "" &&
      creds.email === "" &&
      creds.password === "" &&
      creds.village === "" &&
      creds.cell === ""
    ) {
      return alert("All field are required");
    }
  };

  const handleRegister = () => {
    validate();
    setLoading(true);
    try {
      axios
        .post(`${BASE_URL}/users/createuser`, creds)
        .then((res) => {
          console.log(res.data, "+++++++++++++");
          storeToken("token", res.data.data.token).then(() => {
            console.log("Token stored");
            storeToken("userId", res.data.data.user._id).then(() => {
              console.log("id stored");
              navigation.navigate("Main");
            });
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <View>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={"#c9c9c9"}
            value={creds.name}
            onChangeText={(text) => handlerChange("name", text)}
            style={[styles.input, { width: "100%" }]}
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            placeholder="0787000000"
            placeholderTextColor={"#c9c9c9"}
            keyboardType={"numeric"}
            value={creds.phone}
            onChangeText={(text) => handlerChange("phone", text)}
            style={[styles.input, { width: "100%" }]}
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="mail@example.com"
            placeholderTextColor={"#c9c9c9"}
            keyboardType={"email-address"}
            value={creds.email}
            onChangeText={(text) => handlerChange("email", text)}
            style={[styles.input, { width: "100%" }]}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Cell</Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 7,
              paddingHorizontal: 1 * vmax,
              marginBottom: 2 * vh,
            }}
          >
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
          </View>
        </View>
        <View>
          <Text style={styles.inputLabel}>Village</Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 7,
              paddingHorizontal: 1 * vmax,
              marginBottom: 2 * vh,
            }}
          >
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
                  <Picker.Item label={village.name} value={village} key={idx} />
                ))}
            </Picker>
          </View>
        </View>
        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Create password"
            placeholderTextColor={"#c9c9c9"}
            value={creds.password}
            onChangeText={(text) => handlerChange("password", text)}
            secureTextEntry
            style={[styles.input, { width: "100%" }]}
          />
        </View>
        {loading ? (
          <View style={styles.loading}>
            <UIActivityIndicator color="#000" size={30} />
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
  inputLabel: {
    fontSize: 4.5 * vw,
    fontFamily: "Poppins_400Regular",
    marginBottom: 0.5 * vh,
    marginLeft: 1 * vw,
  },
  input: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    padding: 1 * vmax,
    alignItems: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 2 * vh,
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
  checkbox: {
    marginBottom: 2 * vh,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  or: {
    fontSize: 4 * vw,
    opacity: 0.5,
    alignSelf: "center",
    marginVertical: 2 * vh,
  },
  social: {
    flexDirection: "row",
    alignSelf: "center",
  },
  signUp: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10 * vh,
  },
});
