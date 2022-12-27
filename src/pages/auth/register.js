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
import axios from "axios";
import { Input } from "../../components/fields";

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
      creds.name === "" ||
      creds.phone === "" ||
      creds.email === "" ||
      creds.password === "" ||
      creds.village === "" ||
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

  console.log(creds, "++++++++++++++");
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
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
                handlerChange("village", "");
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
                  <Picker.Item label={village.name} value={village} key={idx} />
                ))}
            </Picker>
          }
        />

        <Input
          label="Password"
          value={creds.password}
          onChangeText={(text) => handlerChange("password", text)}
          placeholder="Create password"
          secureTextEntry={true}
        />

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
