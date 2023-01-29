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
import { StatusBar as Bar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { vh, vw } from "../../../utils/units";
import { Input, TextField } from "../../../components/fields";
import { CreateComment, GetComments } from "../../../redux/actions/comment";
import { MAIN_COLOR } from "../../../utils";
import {
  ResolveInquiry,
  UpdateInquiry,
  GetInquiries,
  RequestSupport,
  resetResolve,
} from "../../../redux/actions";
import { Notify } from "../../../utils/notification";
import { UIActivityIndicator } from "react-native-indicators";

const initialData = {
  user: "",
  inquiry: "",
  comment: "",
};

export const ViewInquiry = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const [data, setData] = useState({ comment: "" });
  const [inquiry, setInquiry] = useState();
  const [description, setDescription] = useState({ description: "", _id: "" });
  const [edit, setEditing] = useState(false);
  const { inquiryId } = props.route.params;
  const {
    inquiries: { inquiries },
    comments: { comments, loading, isCommented },
    login: { user },
    resolveInquiry: { loading: resolving, message: resolved },
  } = useSelector((state) => state);

  useEffect(() => {
    // dispatch(GetInquiries({}));
    setInquiry(inquiries.filter((item) => item._id === inquiryId)[0]);
  }, [inquiries, inquiryId]);
  useEffect(() => {
    if (inquiry) {
      setDescription({
        description: inquiry?.description,
        _id: inquiry?._id,
      });
      dispatch(GetComments({ inquiryId: inquiry?._id }));
    }
  }, [inquiry]);

  const onRefresh = () => {
    dispatch(GetComments({ inquiryId: inquiry?._id }));
  };

  const validate = () => {
    if (data.comment === "") return alert("Comment is required");
    // if (data.inquiry === "") alert('Comment is required')
  };

  const handleResolve = () => {
    console.log("pressed");
    dispatch(ResolveInquiry(inquiry?._id));
  };

  const createComment = () => {
    validate();
    Promise.resolve(
      dispatch(CreateComment({ inquiryId: inquiry?._id, data: data }))
    ).then(() => {
      setData({ comment: "" });
      dispatch(GetComments({ inquiryId: inquiry?._id }));
    });
  };

  const updateInquiry = () => {
    if (description.description === "")
      return alert("You can't leave the description empty");
    dispatch(UpdateInquiry(description));
    dispatch(GetInquiries({}));
  };

  if (resolved) {
    Notify({
      message: "Inquiry resolved",
      onPress: () => {
        dispatch(GetInquiries({}));
        dispatch(resetResolve());
      },
    });
  }

  console.log(inquiries.filter((item) => item._id === inquiryId)[0]);
  console.log(inquiry);
  return (
    <View style={{ flex: 1 }}>
      <Bar style="dark" />
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
          value={inquiry?.title}
          fontSize={20}
          fontFamily="Poppins_500Medium"
          marginBottom={0}
        />
        {user?.user?.role === "user" ? (
          <icons.AntDesign
            name="edit"
            size={20}
            color="black"
            onPress={() => {
              setEditing(true);
            }}
          />
        ) : (
          <icons.AntDesign
            name="edit"
            size={20}
            color="white"
            onPress={() => {}}
          />
        )}
      </View>
      <View
        style={{
          paddingHorizontal: vw * 2,
          paddingTop: 1 * vh,
          // backgroundColor: "#fff",
          flex: 1,
        }}
      >
        {edit ? (
          <View
            style={{
              // flexDirection: "row",
              width: "100%",
              // justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <Input
              placeholder="Type your comment"
              onChangeText={(text) => {
                setDescription({ ...description, description: text });
              }}
              value={description.description}
              marginBottom={1 * vh}
              multiline={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: MAIN_COLOR,
                paddingHorizontal: 2 * vw,
                borderRadius: 10,
                height: 6 * vh,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                minWidth: 20 * vw,
              }}
              onPress={() => {
                updateInquiry();
                setEditing(false);
              }}
            >
              <TextField value={"Save"} marginBottom={0} textColor="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 2 * vw,
                paddingVertical: 1 * vh,
                borderRadius: 10,
                marginBottom: 1 * vh,
              }}
            >
              <TextField
                value={inquiry?.description}
                fontSize={16}
                marginBottom={0}
              />
            </View>
            {user.user?.role === inquiry?.status ||
              (user.user?.role === "user" && (
                <View>
                  <Input
                    placeholder="Type your comment"
                    onChangeText={(text) => {
                      setData({ ...data, comment: text });
                    }}
                    value={data.comment}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: MAIN_COLOR,
                      paddingHorizontal: 2 * vw,
                      borderRadius: 10,
                      height: 6 * vh,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    onPress={() => createComment()}
                  >
                    <TextField
                      value={"Comment"}
                      marginBottom={0}
                      textColor="#fff"
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </>
        )}
        {user.user?.role !== "user" && inquiries?.status !== "Resolved" && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {user.user?.role === inquiry?.status &&
              (!inquiry?.cellSupport || !inquiry?.sectorSupport) && (
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={handleResolve}
                  // disabled={!inquiry?.support}
                >
                  {resolving ? (
                    <View style={styles.loading}>
                      <UIActivityIndicator color={MAIN_COLOR} size={25} />
                    </View>
                  ) : (
                    <TextField
                      value={"Mark resolved"}
                      marginBottom={0}
                      textColor="#fff"
                    />
                  )}
                </TouchableOpacity>
              )}
            {(user.user?.role === "cell" || user.user?.role === "village") &&
              ((!inquiry?.sectorSupport && inquiry?.cellSupport) ||
                !inquiry?.cellSupport) && (
                <TouchableOpacity
                  disabled={user.user?.role !== inquiry?.status}
                  style={[styles.btn]}
                  onPress={() => {
                    dispatch(RequestSupport(inquiry._id));
                    dispatch(GetInquiries({}));
                  }}
                >
                  <TextField
                    value={
                      user.user?.role !== inquiry?.status
                        ? "Support requested"
                        : "Request support"
                    }
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
