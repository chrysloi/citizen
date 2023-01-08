import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
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
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { GetInquiries } from "../../../redux/actions/inquiry";
import { getUserId, getValueForToken, MAIN_COLOR } from "../../../utils";
import { vh, vw } from "../../../utils/units";
import { TextField } from "../../../components/fields";
import { GetComments } from "../../../redux/actions/comment";
import moment from "moment";
import { UIActivityIndicator } from "react-native-indicators";
import { InquiryCard } from "../../../components/inquiryCard";
// import { InquiryCard } from "../userComponents/inquiryCard";
// import { ViewInquiry } from "../viewInquiry";

export const ApprovedInquiries = (navigation) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [viewIquiry, setViewIquiry] = useState(false);
  const [inquiry, setInquiry] = useState({});
  const {
    inquiries: { inquiries, loading },
    login: { user },
    // comments: { comments, loading },
  } = useSelector((state) => state);

  const onRefresh = () => {
    dispatch(GetInquiries({}));
  };

  useEffect(() => {
    dispatch(GetInquiries({}));
  }, []);

  console.log(inquiries);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={styles.container}> */}
      <TouchableOpacity style={[styles.btn]} onPress={() => onRefresh()}>
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
          data={inquiries.filter((item) => item.status === "Resolved")}
          renderItem={({ item }) => <InquiryCard inquiry={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
      {/* </View> */}
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
  cardContainer: {
    marginHorizontal: vw * 2,
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  textgr: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: vw * 90,
  },
});
