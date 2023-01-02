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
import { TextField } from "../fields";
import { InquiryCard } from "../userComponents/inquiryCard";
import { GetComments } from "../../redux/actions/comment";

export const ApprovedInquiries = () => {
  const navigation = useNavigation();
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
  }, [user]);
  useEffect(() => {
    if (inquiry !== {}) {
      dispatch(GetComments({ inquiryId: inquiry._id }));
    }
  }, [inquiry]);
  console.log(inquiries);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={inquiries.filter((item) => item.status === "Resolved")}
          renderItem={({ item }) => (
            <InquiryCard
              inquiry={item}
              onPress={() => {
                console.log("Pressed");
                Promise.resolve(setInquiry(item)).then(() => {
                  setViewIquiry(!viewIquiry);
                });
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          style={{ paddingBottom: vh * 1 }}
        />
      </View>
      <Modal visible={viewIquiry}>
        <View
          style={{
            backgroundColor: "whitesmoke",
            flex: 1,
            // paddingHorizontal: 2 * vw,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 3 * vw,
              paddingVertical: 2 * vh,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <icons.AntDesign
              name="arrowleft"
              size={20}
              color="black"
              onPress={() => {
                Promise.resolve(setInquiry({})).then(() => {
                  setViewIquiry(!viewIquiry);
                });
              }}
            />
            <TextField
              value={inquiry.title}
              fontSize={20}
              fontFamily="Poppins_500Medium"
              marginBottom={0}
            />
            <icons.AntDesign
              name="edit"
              size={20}
              color="black"
              onPress={() => {
                // Promise.resolve(setInquiry({})).then(() => {
                //   setViewIquiry(!viewIquiry);
                // });
              }}
            />
          </View>
          <View style={{ paddingHorizontal: vw * 2, paddingTop: 2 * vh }}>
            <TextField value={inquiry.description} fontSize={16} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.btn, { marginTop: 15, marginEnd: vw * 2 }]}
                // onPress={() => navigation.navigate("AddUser")}
              >
                <TextField
                  value={"Mark resolved"}
                  marginBottom={0}
                  textColor="#fff"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[styles.btn, { marginTop: 15 }]}
                // onPress={() => navigation.navigate("AddUser")}
              >
                <TextField
                  value={"Request support"}
                  marginBottom={0}
                  textColor="#fff"
                />
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: vw * 2,
            }}
          >
            <TextField value="Comments" fontSize={20} />
            <FlatList
              data={comments}
              onRefresh={() => onRefresh()}
              refreshing={loading}
              renderItem={({ item }) => {
                return (
                  <View style={styles.container} key={item._id}>
                    <View style={styles.textgr}>
                      <TextField
                        value={item.name}
                        fontSize={18}
                        fontFamily="Poppins_500Medium"
                        marginBottom={0}
                      />
                      <icons.AntDesign
                        name="delete"
                        size={20}
                        color={"red"}
                        onPress={() => {
                          dispatch(DeleteCategory(item._id));
                          onRefresh();
                        }}
                      />
                    </View>
                    <TextField
                      value={item.description}
                      fontSize={15}
                      marginBottom={0}
                    />
                  </View>
                );
              }}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
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
});
