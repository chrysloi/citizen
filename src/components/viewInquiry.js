import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as icons from "@expo/vector-icons";
import { vh, vw } from "../utils/units";
import { TextField } from "./fields";
import { useDispatch, useSelector } from "react-redux";
import { GetComments } from "../redux/actions/comment";

export const ViewInquiry = ({
  viewIquiry,
  setViewIquiry,
  inquiry,
  setInquiry,
}) => {
  const dispatch = useDispatch();
  const {
    comments: { comments, loading },
  } = useSelector((state) => state);
  const onRefresh = () => {
    dispatch(GetComments({ inquiryId: inquiry._id }));
  };
  return (
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
                        //   dispatch(DeleteCategory(item._id));
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
  );
};

const styles = StyleSheet.create({});
