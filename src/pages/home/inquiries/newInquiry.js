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
import * as icons from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UIActivityIndicator } from "react-native-indicators";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { StatusBar as Bar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  BASE_URL,
  getValueForToken,
  MAIN_COLOR,
  storeToken,
} from "../../../utils";
import { vh, vmax, vw } from "../../../utils/units";
import { Input, TextField } from "../../../components/fields";
import { GetCategories } from "../../../redux/actions/category";
import { CreateInquiry } from "../../../redux/actions/inquiry";

const initialData = {
  title: "",
  description: "",
  category: null,
  user: null,
  cell: null,
  village: null,
};

export const NewInquiry = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [done, setDone] = useState(false);
  const [creds, setCreds] = useState(initialData);
  const [categoryValue, setCategoryValue] = useState();
  const [user, setUser] = useState();
  const [valid, setValid] = useState(false);

  const {
    categories: { categories },
    createInquiry: { loading, inquiry },
  } = state;

  const handlerChange = (key, value) => {
    setCreds((prevCred) => ({ ...prevCred, [key]: value }));
  };

  useEffect(() => {
    dispatch(GetCategories({}));
    getValueForToken("user")
      .then((res) => {
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
  useEffect(() => {
    if (categories[0]) {
      setCreds((prevCred) => ({
        ...prevCred,
        category: categories[0]._id,
      }));
    }
  }, [categories]);

  const validate = () => {
    if (creds.title === "") return alert("Title is required");
    else if (creds.description === "") return alert("Description is required");
    else if (creds.category === "") return alert("Category is required");
    else setValid(true);
  };

  const handleNewInquiry = () => {
    validate();
    try {
      axios
        .post(`${BASE_URL}/inquiry`, creds)
        .then((res) => {
          if (res.status === 201) {
            Alert.alert(undefined, "Inquiry sent successfully", [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                  // dispatch(resetRegister());
                },
              },
            ]);
          }
        })
        .catch((err) => {
          console.error(err);
          Alert.alert(undefined, "Error accorrured", [
            {
              text: "OK",
              onPress: () => {
                // navigation.navigate("Main");
                // dispatch(resetRegister());
              },
            },
          ]);
        });
    } catch (error) {
      Alert.alert(undefined, "Error accorrured", [
        {
          text: "OK",
          onPress: () => {
            // navigation.navigate("Main");
            // dispatch(resetRegister());
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Bar style="dark" />
      <KeyboardAwareScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2 * vh,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <icons.AntDesign
              name="left"
              size={25}
              style={{ marginEnd: 2 * vw }}
            />
          </TouchableOpacity>
          <TextField
            value="What's going on?"
            fontSize={25}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          />
        </View>
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
