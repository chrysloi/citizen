import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { vh, vw } from "../../../utils/units";
import { Input, TextField } from "../../../components/fields";
import { CreateComment, GetComments } from "../../../redux/actions/comment";
import { MAIN_COLOR } from "../../../utils";
import { ResolveInquiry } from "../../../redux/actions";

const initialData = {
  user: "",
  inquiry: "",
  comment: "",
};

export const ViewInquiry = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const [data, setData] = useState({ comment: "" });
  const { inquiry } = props.route.params;
  const {
    comments: { comments, loading, isCommented },
    login: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetComments({ inquiryId: inquiry._id }));
  }, []);

  const onRefresh = () => {
    dispatch(GetComments({ inquiryId: inquiry._id }));
  };

  const validate = () => {
    if (data.comment === "") alert("Comment is required");
    // if (data.inquiry === "") alert('Comment is required')
  };

  const handleResolve = () => {
    console.log("pressed");
    dispatch(ResolveInquiry(inquiry._id));
  };

  const createComment = () => {
    validate();
    Promise.resolve(
      dispatch(CreateComment({ inquiryId: inquiry._id, data: data }))
    ).then(() => {
      setData({ comment: "" });
      dispatch(GetComments({ inquiryId: inquiry._id }));
    });
  };

  // if (isCommented) {
  //   setData("");
  //   dispatch(GetComments({ inquiryId: inquiry._id }));
  // }

  console.log(inquiry);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 3 * vw,
          paddingTop: StatusBar.currentHeight,
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
            navigation.navigate("Main");
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
      <View
        style={{
          paddingHorizontal: vw * 2,
          paddingTop: 2 * vh,
          // backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <TextField value={inquiry.description} fontSize={16} />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Type your comment"
            onChangeText={(text) => {
              setData({ ...data, comment: text });
            }}
            value={data.comment}
            width="195%"
          />
          <TouchableOpacity
            style={{
              backgroundColor: MAIN_COLOR,
              paddingHorizontal: 2 * vw,
              borderRadius: 10,
              height: 7 * vh,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 2 * vh,
            }}
            onPress={() => createComment()}
          >
            <TextField value={"Comment"} marginBottom={0} textColor="#fff" />
          </TouchableOpacity>
        </View>
        {user.user?.role !== "user" && inquiry?.status !== "Resolved" && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {!inquiry.support && (
              <TouchableOpacity
                style={[styles.btn]}
                onPress={handleResolve}
                disabled={!inquiry.support}
              >
                <TextField
                  value={"Mark resolved"}
                  marginBottom={0}
                  textColor="#fff"
                />
              </TouchableOpacity>
            )}
            {inquiry.support && (
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
            )}
          </View>
        )}
        <View
          style={{
            // backgroundColor: "#fff",
            paddingHorizontal: vw * 2,
            marginTop: vh * 2,
          }}
        >
          <TextField
            value="Comments"
            fontSize={20}
            fontFamily="Poppins_500Medium"
            marginBottom={1 * vh}
          />
          <FlatList
            data={comments}
            onRefresh={() => onRefresh()}
            refreshing={loading}
            renderItem={({ item }) => {
              return (
                <View style={styles.container} key={item._id}>
                  <View style={styles.textgr}>
                    <TextField
                      value={item.user.name}
                      fontSize={18}
                      fontFamily="Poppins_500Medium"
                      marginBottom={1 * vh}
                    />
                    {/* <TextField
                        value={item.comment}
                        fontSize={18}
                        // fontFamily="Poppins_500Medium"
                        marginBottom={0}
                      /> */}
                    {/* <icons.AntDesign
                      name="delete"
                      size={20}
                      color={"red"}
                      onPress={() => {
                        //   dispatch(DeleteCategory(item._id));
                        onRefresh();
                      }}
                    /> */}
                  </View>
                  <TextField
                    value={item.comment}
                    fontSize={15}
                    // marginBottom={0}
                  />
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </View>
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
