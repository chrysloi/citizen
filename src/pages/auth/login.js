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
  Alert,
} from "react-native";
import { StatusBar as Bar } from "expo-status-bar";
import * as icons from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";
import { vh, vmax, vw } from "../../utils/units";
import { BASE_URL, MAIN_COLOR, storeToken } from "../../utils";
import { Input } from "../../components/fields";
import { LoginUser, resetLogin } from "../../redux/actions/users";
import { useNavigation } from "@react-navigation/native";
import { Notify } from "../../utils/notification";

const initialData = {
  phone: "",
  password: "",
};
export const Login = (props) => {
  // const { navigation } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, isLoggedIn, error } = useSelector(
    (state) => state.login
  );
  const [creds, setCreds] = useState(initialData);
  const [viewPassword, setViewPassword] = useState(true);

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  const togglePassword = () => {
    setViewPassword(!viewPassword);
  };

  const validate = () => {
    // const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    // const phoneRegex = new RegExp(/^(078|072|073|079)\d{7}$/);
    // if (creds.phone === "") {
    //   return Notify({ message: "phone field is required" });
    // }
    // if (phoneRegex.test(creds.phone) !== true) {
    //   return Notify({
    //     message:
    //       "Your phone number isn't valid. it should contain 10 digits and starts with 079 or 078 or 073 or 072",
    //   });
    // }

    // if (creds.password === "") {
    //   return Notify({ message: "password field is required" });
    // }
    // if (regex.test(creds.password) !== true) {
    //   return Notify({
    //     message:
    //       "your password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number",
    //   });
    // }
    dispatch(LoginUser(creds));
  };

  const handleLogin = () => {
    validate();
  };
  if (user) {
    navigation.navigate("Main");
  }
  if (error) {
    Notify({
      message: error,
      onPress: () => {
        dispatch(resetLogin());
      },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Bar style="dark" />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <Text style={styles.title}>Login to your {"\n"}account</Text>
          <Input
            label="Phone"
            placeholder="0787000000"
            keyboardType="numeric"
            value={creds.phone}
            onChangeText={(text) => handlerChange("phone", text)}
          />

          <Input
            label="Password"
            value={creds.password}
            onChangeText={(text) => handlerChange("password", text)}
            placeholder="Your password"
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

          {loading && (
            <View style={styles.loading}>
              <UIActivityIndicator color={MAIN_COLOR} size={30} />
            </View>
          )}
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
  signUp: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 2 * vh,
  },
});
