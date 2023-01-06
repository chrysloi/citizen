import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetInquiries } from "../../redux/actions/inquiry";
import { getUserId, getValueForToken, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../fields";
import { InquiryCard } from "../userComponents/inquiryCard";
import { ViewInquiry } from "../viewInquiry";

export const NonApprovedInquiries = () => {
  const navigation = useNavigation();
  const [viewIquiry, setViewIquiry] = useState(false);
  const [inquiry, setInquiry] = useState({});
  const {
    inquiries: { inquiries },
    login: { user },
  } = useSelector((state) => state);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={inquiries.filter((item) => item.status !== "Resolved")}
          renderItem={({ item }) => (
            <InquiryCard
              inquiry={item}
              onPress={() => {
                Promise.resolve(setInquiry(item)).then(() => {
                  setViewIquiry(!viewIquiry);
                });
              }}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <ViewInquiry
        viewIquiry={viewIquiry}
        setViewIquiry={setViewIquiry}
        setInquiry={setInquiry}
        inquiry={inquiry}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  new: {
    backgroundColor: MAIN_COLOR,
    height: 35,
    width: 35,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
