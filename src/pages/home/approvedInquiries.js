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
import { GetInquiries } from "../../redux/actions/inquiry";
import { getUserId, getValueForToken, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../../components/fields";
// import { InquiryCard } from "../userComponents/inquiryCard";
import { GetComments } from "../../redux/actions/comment";
// import { ViewInquiry } from "../viewInquiry";
import moment from "moment";

export const ApprovedInquiries = (navigation) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [viewIquiry, setViewIquiry] = useState(false);
  const [inquiry, setInquiry] = useState({});
  const {
    inquiries: { inquiries },
    login: { user },
    comments: { comments, loading },
  } = useSelector((state) => state);

  const onRefresh = () => {
    // if (inquiries) {
    //   dispatch(GetInquiries({}));
    // } else {
    dispatch(GetComments({ inquiryId: inquiry._id }));
    // }
    // dispatch(GetCategories({}));
  };

  useEffect(() => {
    if (user) {
      dispatch(GetInquiries({}));
    }
  }, []);
  useEffect(() => {
    if (inquiry !== {}) {
      dispatch(GetComments({ inquiryId: inquiry._id }));
    }
  }, [inquiry]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={inquiries.filter((item) => item.status === "Resolved")}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                navigation.navigate("ViewInquiry", inquiry);
                // Promise.resolve(setInquiry(item)).then(() => {
                //   setViewIquiry(true);
                // });
              }}
            >
              <View>
                <View style={styles.textgr}>
                  <TextField
                    value={item.title}
                    fontSize={18}
                    fontFamily="Poppins_500Medium"
                    marginBottom={0}
                  />
                  <Text
                    style={[
                      styles.text,
                      item.status === "Pending"
                        ? { color: "#fab430" }
                        : item.status === "Resolved"
                        ? { color: "#20603D" }
                        : { color: "red" },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <TextField
                  value={item.description}
                  fontSize={15}
                  marginBottom={0}
                />
                <View style={styles.textgr}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.text]}>Posted on </Text>
                    <Text style={styles.text}>
                      {moment(item.createdAt).format("DD MMM YYYY")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          // style={{ paddingBottom: vh * 1 }}
        />
      </View>
      {/* <ViewInquiry
        viewIquiry={viewIquiry}
        setViewIquiry={setViewIquiry}
        setInquiry={setInquiry}
        inquiry={inquiry}
      /> */}
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
