import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { MAIN_COLOR } from "../utils/index";
import { vw } from "../utils/units";
import { TextField } from "./fields";

export const LevelCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <View style={styles.textgr}>
          <TextField
            value={data?.name}
            fontSize={18}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          />
        </View>
        <TextField value={data?.leader?.name} fontSize={15} marginBottom={0} />
        <TextField value={data?.leader?.phone} fontSize={15} marginBottom={0} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: vw * 2.5,
    marginTop: 10,
    width: 45 * vw,
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
