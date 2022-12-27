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
import {
  BASE_URL,
  getValueForToken,
  MAIN_COLOR,
  storeToken,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { vh, vmax, vw } from "../../utils/units";
import { Input, TextField } from "../fields";
import { GetCategories } from "../../redux/actions/category";
import jwtDecode from "jwt-decode";
import { CreateInquiry } from "../../redux/actions/inquiry";
import { useNavigation } from "@react-navigation/native";

const initialData = {
  title: "",
  description: "",
  category: null,
  user: null,
  cell: null,
  village: null,
};

export const NewInquiry = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  //   const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState(initialData);
  const [categoryValue, setCategoryValue] = useState();
  const [user, setUser] = useState();

  const {
    categories: { categories },
    inquiries: { loading, message },
  } = state;

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  useEffect(() => {
    dispatch(GetCategories({}));
    getValueForToken("user")
      .then((res) => {
        console.log(res);
        setUser(jwtDecode(res).user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setCreds((prevCred) => ({
        ...prevCred,
        user: user?._id,
        cell: user?.cell?._id,
        village: user?.village?._id,
      }));
    }
  }, [user]);

  const validate = () => {
    if (
      creds.title === "" ||
      creds.description === "" ||
      creds.category === null
    ) {
      return alert("All field are required");
    }
  };

  const handleNewInquiry = () => {
    validate();
    dispatch(CreateInquiry(creds));
  };

  if (!loading && message !== "") {
    navigation.goBack();
  }
  console.log(message, "++++++++++++++");
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <KeyboardAwareScrollView style={styles.container}>
        <TextField
          value="What's going on?"
          fontSize={25}
          fontFamily="Poppins_500Medium"
        />
        <Input
          label="Title"
          value={creds.title}
          onChangeText={(text) => handlerChange("title", text)}
          placeholder="Title"
        />

        <Input
          label="Category"
          picker={true}
          toPicker={
            <Picker
              selectedValue={categoryValue}
              onValueChange={(itemValue, itemIndex) => {
                setCategoryValue(itemValue);
                handlerChange("category", itemValue?._id);
              }}
            >
              {categories.map((category, idx) => (
                <Picker.Item label={category.name} value={category} key={idx} />
              ))}
            </Picker>
          }
        />

        <Input
          label="Description"
          value={creds.description}
          onChangeText={(text) => handlerChange("description", text)}
          placeholder="A brief description of your inquiry"
        />

        {loading ? (
          <View style={styles.loading}>
            <UIActivityIndicator color="#000" size={30} />
          </View>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleNewInquiry}>
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