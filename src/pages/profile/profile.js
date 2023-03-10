import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { Style } from "./style";
import { ProfileOpt } from "../../components/profileOpt";
import { getValueForToken, MAIN_COLOR } from "../../utils";
import { TextField } from "../../components/fields";
import { Logout } from "../../redux/actions/users";

export const Profile = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loggedInUser, setUser] = useState();

  useEffect(() => {
    getValueForToken().then((res) => {
      setUser(jwtDecode(res).user);
    });
  }, []);

  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Style.visual}>
        <View style={Style.profiledetail}>
          <TextField
            value={loggedInUser?.name}
            fontSize={20}
            marginBottom={0}
          />
          {/* <Text style={[Style.name]}>{loggedInUser?.name}</Text> */}
          <Text style={Style.role}>{loggedInUser?.role}</Text>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 25,
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <icons.FontAwesome name="sign-out" size={25} color={MAIN_COLOR} />
        </TouchableOpacity>
      </View>
      <ScrollView style={Style.profile} showsVerticalScrollIndicator={false}>
        <ProfileOpt
          title="Profile"
          content="Complete profile"
          icon={
            <icons.MaterialCommunityIcons
              name="account-details"
              size={25}
              color={MAIN_COLOR}
            />
          }
          navigate={() => navigation.navigate("UserDetails")}
        />
        <ProfileOpt
          title="Term & Privacy"
          content="Read Term and Conditions of use"
          icon={
            <icons.MaterialIcons
              name="privacy-tip"
              size={25}
              color={MAIN_COLOR}
            />
          }
          navigate={() => navigation.navigate("Other")}
        />
        <ProfileOpt
          title="Help"
          content="Get help"
          icon={<icons.Entypo name="help" size={25} color={MAIN_COLOR} />}
          navigate={() => navigation.navigate("Other")}
        />
        <ProfileOpt
          title="About Us"
          content="Read about us"
          icon={
            <icons.AntDesign name="infocirlce" size={25} color={MAIN_COLOR} />
          }
          navigate={() => navigation.navigate("Other")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
