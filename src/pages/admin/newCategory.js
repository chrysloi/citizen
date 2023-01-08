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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UIActivityIndicator } from "react-native-indicators";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  BASE_URL,
  getValueForToken,
  MAIN_COLOR,
  storeToken,
} from "../../utils";
import { vh, vmax, vw } from "../../utils/units";
import { Input, TextField } from "../../components/fields";
import { CreateCategory } from "../../redux/actions";

const initialData = {
  name: "",
  description: "",
};

export const NewCategory = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [done, setDone] = useState(false);
  const [creds, setCreds] = useState(initialData);
  const [categoryValue, setCategoryValue] = useState();
  const [user, setUser] = useState();
  const [valid, setValid] = useState(false);

  const {
    categories: { isCreated, loading },
  } = state;

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  useEffect(() => {
    getValueForToken("user")
      .then((res) => {
        setUser(jwtDecode(res).user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const validate = () => {
    if (creds.name === "") return alert("Name is required");
    else if (creds.description === "") return alert("Description is required");
    else setValid(true);
  };

  const handleNewCategory = () => {
    validate();
    Promise.resolve(dispatch(CreateCategory(creds))).then(() =>
      navigation.goBack()
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <KeyboardAwareScrollView style={styles.container}>
        <Input
          label="Name"
          value={creds.title}
          onChangeText={(text) => handlerChange("name", text)}
          placeholder="Cotegory name"
        />

        <Input
          label="Description"
          value={creds.description}
          onChangeText={(text) => handlerChange("description", text)}
          placeholder="A brief description of this category"
        />

        {loading && (
          <View style={styles.loading}>
            <UIActivityIndicator color={MAIN_COLOR} size={30} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleNewCategory}>
          <Text style={styles.signIn}>Post</Text>
        </TouchableOpacity>
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
