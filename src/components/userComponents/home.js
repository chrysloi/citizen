import { useNavigation } from "@react-navigation/native";
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
import { useDispatch, useSelector } from "react-redux";
import { GetInquiries } from "../../redux/actions/inquiry";
import { getUserId, MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../fields";
import { InquiryCard } from "./inquiryCard";

export const UserHome = () => {
  const navigation = useNavigation();
  const [viewIquiry, setViewIquiry] = useState(false);
  const dispatch = useDispatch();
  const {
    login: { user },
    inquiries: { inquiries },
  } = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      dispatch(GetInquiries({}));
    }
  }, [user]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.head}>
          <TextField
            value="My inquiries"
            fontSize={20}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          />
          <TouchableOpacity
            style={styles.new}
            onPress={() => {
              navigation.navigate("NewInquiry");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20, alignSelf: "center" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={inquiries}
          renderItem={({ item }) => (
            <InquiryCard
              inquiry={item}
              onPress={() => {
                console.log("Pressed");
                setViewIquiry(!viewIquiry);
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          style={{ marginBottom: vh * 40 }}
        />
      </View>
      <Modal visible={viewIquiry} transparent>
        <View style={{ backgroundColor: "#fff" }}>
          {/* <TextField
            value={inquiry.title}
            fontSize={18}
            fontFamily="Poppins_500Medium"
            marginBottom={0}
          /> */}
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
});
