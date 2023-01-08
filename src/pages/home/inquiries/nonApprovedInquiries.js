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
import { getUserId, getValueForToken, MAIN_COLOR } from "../../../utils";
import { vh, vw } from "../../../utils/units";
import { InquiryCard } from "../../../components/inquiryCard";
import { TextField } from "../../../components/fields";
import { GetInquiries } from "../../../redux/actions";
import { UIActivityIndicator } from "react-native-indicators";
// import { GetInquiries } from "../../redux/actions/inquiry";
// import { TextField } from "../fields";
// import { ViewInquiry } from "../viewInquiry";

export const NonApprovedInquiries = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [viewIquiry, setViewIquiry] = useState(false);
  const [inquiry, setInquiry] = useState({});
  const {
    inquiries: { inquiries, loading },
    login: { user },
  } = useSelector((state) => state);

  const onRefresh = () => {
    dispatch(GetInquiries({}));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 15, marginHorizontal: 15 }]}
        onPress={() => onRefresh()}
      >
        <TextField value={"Refresh"} marginBottom={0} textColor="#fff" />
      </TouchableOpacity>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <UIActivityIndicator color={MAIN_COLOR} size={60} />
        </View>
      ) : (
        <FlatList
          refreshing={loading}
          data={inquiries.filter((item) => item.status !== "Resolved")}
          renderItem={({ item }) => <InquiryCard inquiry={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
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
  btn: {
    padding: 10,
    backgroundColor: MAIN_COLOR,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    minWidth: vw * 30,
    marginTop: 15,
    marginHorizontal: 15,
  },
});
