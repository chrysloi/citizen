import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as icons from "@expo/vector-icons";
import { vh, vmax, vw } from "../../utils/units";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { firebase } from "../../utils/firebase";
import { UIActivityIndicator } from "react-native-indicators";
import { ImagePicker } from "expo";
import { BASE_URL, MAIN_COLOR, storeToken } from "../../utils";
import axios from "axios";

const initialData = {
  phone: "",
  password: "",
};
export const Login = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState(initialData);

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  const validate = () => {
    if (creds.phone === "" || creds.password === "") {
      return alert("All field are required");
    }
  };

  const handleLogin = () => {
    validate();
    setLoading(true);
    try {
      axios
        .post(`${BASE_URL}/users/login`, creds)
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
          console.info(err);
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
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <Text style={styles.title}>Login to your {"\n"}account</Text>
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
              <UIActivityIndicator color={MAIN_COLOR} size={30} />
            </View>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[styles.signIn, { fontFamily: "Poppins_400Regular" }]}>
              Sign in
            </Text>
          </TouchableOpacity>

          <View style={styles.signUp}>
            <Text style={{ opacity: 0.5, fontFamily: "Poppins_400Regular" }}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
              <Text style={{ fontFamily: "Poppins_400Regular" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "30%",
    paddingHorizontal: 5 * vw,
    flex: 1,
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
    marginTop: 2 * vh,
  },
  loading: {
    width: 80 * vw,
    height: 7 * vh,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  signIn: {
    color: "#fff",
    fontSize: 4.5 * vw,
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
    marginVertical: 2 * vh,
  },
});
