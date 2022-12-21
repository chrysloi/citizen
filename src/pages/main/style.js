import { StyleSheet } from "react-native";
import { WIDTH } from "../../utils";

export const GradientLoad = ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.3)"];

export const Style = StyleSheet.create({
  visual: {
    width: WIDTH,
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 15,
    flexDirection: "row",
  },
  profiledetail: {
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 75,
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
    alignItems: "center",
    fontFamily: "Poppins_400Regular",
  },
  role: {
    paddingHorizontal: 5,
    backgroundColor: "grey",
    color: "#fff",
    fontFamily: "Poppins_400Regular",
  },
  profile_op: {
    // flex: 1,
    width: WIDTH * 0.9,
    marginTop: 10,
    marginHorizontal: WIDTH * 0.05,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
  },
  logout: {
    width: WIDTH * 0.7,
    marginTop: 10,
    marginHorizontal: WIDTH * 0.1,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
  },
  containerLog: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  font: {
    fontFamily: "Poppins_400Regular",
  },
  details: {
    marginStart: 10,
  },
});
