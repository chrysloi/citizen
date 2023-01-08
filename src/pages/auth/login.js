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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { UIActivityIndicator } from "react-native-indicators";
import { vh, vmax, vw } from "../../utils/units";
import { BASE_URL, MAIN_COLOR, storeToken } from "../../utils";
import { Input } from "../../components/fields";
import { LoginUser } from "../../redux/actions/users";
import { useNavigation } from "@react-navigation/native";

const initialData = {
  phone: "",
  password: "",
};
export const Login = (props) => {
  // const { navigation } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, isLoggedIn } = useSelector((state) => state.login);
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
    dispatch(LoginUser(creds));
  };
  // if (user) {
  //   navigation.navigate("Main");
  // }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
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
            secureTextEntry={true}
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
