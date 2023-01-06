import React, { useEffect } from "react";
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
import { MAIN_COLOR } from "../utils";

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
  useEffect(() => {
    dispatch(GetComments({ inquiryId: inquiry._id }));
  }, []);
  const onRefresh = () => {
    dispatch(GetComments({ inquiryId: inquiry._id }));
  };
  return (
    <Modal visible={viewIquiry} style={{ flex: 1 }}>
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
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={[styles.btn]}
            // onPress={() => navigation.navigate("AddUser")}
          >
            <TextField
              value={"Mark resolved"}
              marginBottom={0}
              textColor="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn]}
            // onPress={() => navigation.navigate("AddUser")}
          >
            <TextField
              value={"Request support"}
              marginBottom={0}
              textColor="#fff"
            />
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  btn: {
    backgroundColor: MAIN_COLOR,
    width: 38 * vw,
    paddingHorizontal: 2 * vw,
    borderRadius: 20,
    height: 7 * vh,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 2 * vh,
  },
});
