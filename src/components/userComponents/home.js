import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as icons from "@expo/vector-icons";
import {
  MaterialIndicator,
  UIActivityIndicator,
} from "react-native-indicators";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetInquiries } from "../../redux/actions/inquiry";
import { getUserId, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../fields";
import { InquiryCard } from "./inquiryCard";

export const UserHome = () => {
  const navigation = useNavigation();
  const [viewIquiry, setViewIquiry] = useState(false);
  const dispatch = useDispatch();
  const {
    login: { user },
    inquiries: { inquiries, loading },
  } = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      dispatch(GetInquiries({}));
    }
  }, [user]);
  const onRefresh = () => {
    dispatch(GetInquiries({}));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.head}>
          <TextField
            value="My inquiries"
            fontSize={20}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          />
          <View style={{ flexDirection: "row" }}>
            <icons.Ionicons
              name="refresh"
              size={25}
              color={MAIN_COLOR}
              onPress={() => {
                onRefresh();
              }}
            />
            <TouchableOpacity
              style={styles.new}
              onPress={() => {
                navigation.navigate("NewInquiry");
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 20, alignSelf: "center" }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <UIActivityIndicator color={MAIN_COLOR} size={60} />
          </View>
        ) : (
          <FlatList
            data={inquiries}
            renderItem={({ item }) => (
              <InquiryCard
                inquiry={item}
                onPress={() => {
                  setViewIquiry(!viewIquiry);
                }}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
      <Modal visible={viewIquiry} transparent>
        <View style={{ backgroundColor: "#fff" }}>
          {/* <TextField
            value={inquiry.title}
            fontSize={18}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          /> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  new: {
    backgroundColor: MAIN_COLOR,
    height: 35,
    width: 35,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  head: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: vh * 2.5,
    paddingHorizontal: vw * 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
});
