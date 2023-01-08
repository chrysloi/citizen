import { StyleSheet, StatusBar } from "react-native";
import { vw } from "../../utils/units";

export const GradientLoad = ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.3)"];

export const Style = StyleSheet.create({
  visual: {
    marginTop: StatusBar.currentHeight + 10,
    width: vw * 100,
    alignItems: "center",
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
  profile: {
    // flex: 1,
    width: vw * 90,
    marginTop: 10,
    marginHorizontal: vw * 5,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
  },
  logout: {
    width: vw * 70,
    marginTop: 10,
    marginHorizontal: vw * 10,
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
