import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
// import { MAIN_COLOR, WIDTH }
import { useNavigation } from "@react-navigation/native";
import { MAIN_COLOR } from "../../utils";
import { vw } from "../../utils/units";
import { TextField } from "../fields";
import moment from "moment";

export const InquiryCard = ({ inquiry, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <View style={styles.textgr}>
          <TextField
            value={inquiry.title}
            fontSize={18}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          />
          <Text
            style={[
              styles.text,
              inquiry.status === "Pending"
                ? { color: "#fab430" }
                : inquiry.status === "Resolved"
                ? { color: "#20603D" }
                : { color: "red" },
            ]}
          >
            {inquiry.status}
          </Text>
        </View>
        <TextField value={inquiry.description} fontSize={15} marginBottom={0} />
        <View style={styles.textgr}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text]}>Posted on </Text>
            <Text style={styles.text}>
              {moment(inquiry.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 200,
    width: 280,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    padding: 10,
    backgroundColor: MAIN_COLOR,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    minWidth: vw * 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  editing: {
    // borderWidth: 1,
    flexDirection: "row",
    borderWidth: 0.1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 1.5,
    justifyContent: "space-between",
  },
});
