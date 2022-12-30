import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
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

export const ApprovedInquiries = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    inquiries: { inquiries },
    login: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      dispatch(GetInquiries({}));
    }
  }, [user]);
  console.log(inquiries);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={inquiries.filter((item) => item.status === "Resolved")}
          renderItem={({ item }) => <InquiryCard inquiry={item} />}
          keyExtractor={(item) => item._id}
          style={{ paddingBottom: vh * 1 }}
        />
      </View>
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
