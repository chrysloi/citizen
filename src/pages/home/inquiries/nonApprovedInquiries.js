import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as icons from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getValueForToken, MAIN_COLOR } from "../../../utils";
import { vh, vw } from "../../../utils/units";
import { InquiryCard } from "../../../components/inquiryCard";
import { TextField } from "../../../components/fields";
import { GetInquiries } from "../../../redux/actions";
import { UIActivityIndicator } from "react-native-indicators";
// import { GetInquiries } from "../../redux/actions/inquiry";
// import { TextField } from "../fields";
// import { ViewInquiry } from "../viewInquiry";

export const NonApprovedInquiries = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState({
    toFilter: "",
    wordFilter: "",
  });
  const [filter, setFilter] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [filter2, setFilter2] = useState(false);
  const [viewIquiry, setViewIquiry] = useState(false);
  const [inquiry, setInquiry] = useState({});
  const {
    inquiries: { inquiries, loading },
    login: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    if (filterText.toFilter === "categories") {
      setFiltered(
        inquiries.filter(
          (item) => item.category?.name === filterText.wordFilter
        )
      );
    }
    if (filterText.toFilter === "villages") {
      setFiltered(
        inquiries.filter((item) => item.village?.name === filterText.wordFilter)
      );
    }
    if (filterText.toFilter === "cells") {
      setFiltered(
        inquiries.filter((item) => item.cell?.name === filterText.wordFilter)
      );
    }
  }, [filterText]);

  const categoriesFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.category?.name))
  );
  const villageFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.village?.name))
  );
  const cellFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.cell?.name))
  );

  const onRefresh = () => {
    dispatch(GetInquiries({}));
  };

  console.log(filterText);
  console.log(filtered);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: vw * 2,
        }}
      >
        <TouchableOpacity style={[styles.btn]} onPress={() => onRefresh()}>
          <TextField value={"Refresh"} marginBottom={0} textColor="#fff" />
        </TouchableOpacity>
        <icons.AntDesign
          name="filter"
          color={MAIN_COLOR}
          size={30}
          onPress={() => {
            setFilter(true);
          }}
        />
        {filter && (
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                setFilter(false);
                setFilterText({ wordFilter: "", toFilter: "" });
                setFiltered([]);
              }}
            >
              <TextField value={"clear"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter(false);
                setFilterText({ ...filterText, toFilter: "categories" });
                setFilter2(true);
              }}
            >
              <TextField value={"categories"} />
            </TouchableOpacity>
            {(user?.user?.role === "cell" || user?.user?.role === "sector") && (
              <TouchableOpacity
                onPress={() => {
                  setFilter(false);
                  setFilterText({ ...filterText, toFilter: "villages" });
                  setFilter2(true);
                }}
              >
                <TextField value={"villages"} />
              </TouchableOpacity>
            )}
            {user?.user?.role === "sector" && (
              <TouchableOpacity
                onPress={() => {
                  setFilter(false);
                  setFilterText({ ...filterText, toFilter: "cells" });
                  setFilter2(true);
                }}
              >
                <TextField value={"cells"} />
              </TouchableOpacity>
            )}
          </View>
        )}
        {filter2 && (
          <View style={styles.modal}>
            {filterText.toFilter === "categories" &&
              categoriesFilters.map((option) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setFilter2(false);
                      setFilterText({ ...filterText, wordFilter: option });
                    }}
                  >
                    <TextField value={option} />
                  </TouchableOpacity>
                );
              })}
            {filterText.toFilter === "villages" &&
              villageFilters.map((option) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setFilter2(false);
                      setFilterText({ ...filterText, wordFilter: option });
                    }}
                  >
                    <TextField value={option} />
                  </TouchableOpacity>
                );
              })}
            {filterText.toFilter === "cells" &&
              cellFilters.map((option) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setFilter2(false);
                      setFilterText({ ...filterText, wordFilter: option });
                    }}
                  >
                    <TextField value={option} />
                  </TouchableOpacity>
                );
              })}
          </View>
        )}
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <UIActivityIndicator color={MAIN_COLOR} size={60} />
        </View>
      ) : (
        <FlatList
          refreshing={loading}
          data={
            filtered.length > 0
              ? filtered.filter((item) => item.status !== "Resolved")
              : inquiries.filter((item) => item.status !== "Resolved")
          }
          renderItem={({ item }) => <InquiryCard inquiry={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
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
  modal: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    position: "absolute",
    top: 15,
    right: vw * 2,
    paddingHorizontal: vw * 2,
    paddingTop: vh * 2,
    borderRadius: 10,
    borderColor: "whitesmoke",
    borderWidth: 2,
    backgroundColor: "#fff",
    zIndex: 1,
    shadowOpacity: 0.2,
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
    marginTop: 15,
    marginHorizontal: 15,
  },
});
