import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as icons from "@expo/vector-icons";
import { MAIN_COLOR } from "../../utils";
import { vh, vw } from "../../utils/units";
import { TextField } from "../../components/fields";
import { useSelector } from "react-redux";
import { Chart } from "../../components/chart";

export const Statistics = () => {
  const [filterText, setFilterText] = useState({
    toFilter: "",
    wordFilter: "",
  });
  const [filter, setFilter] = useState(false);
  const [resolved, setResolved] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter2, setFilter2] = useState(false);
  const data = [
    { label: "Section 1", value: 60, color: "#F00" },
    { label: "Section 2", value: 40, color: "#0F0" },
  ];

  const {
    inquiries: { inquiries, loading },
    login: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    if (filterText.toFilter === "status") {
      setFiltered(
        inquiries.filter((item) => item.status === filterText.wordFilter)
      );
    }
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

  useEffect(() => {
    if (inquiries) {
      setResolved(inquiries.filter((inquiry) => inquiry.status !== "Resolved"));
    }
  }, [inquiries]);

  const categoriesFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.category?.name))
  );
  const villageFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.village?.name))
  );
  const cellFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.cell?.name))
  );
  const statusFilters = Array.from(
    new Set(inquiries.map((inquiry) => inquiry.status))
  );

  console.log(resolved);
  const timeFiltered = (arr) => {
    const today = new Date();
    return arr.filter((item) => {
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 30
      );
      const date = new Date(item.createdAt);
      return date >= start && date <= today;
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 2 * vw, paddingVertical: 2 * vh }}
    >
      {/* <icons.AntDesign
        name="filter"
        color={MAIN_COLOR}
        size={30}
        style={{
          alignSelf: "flex-end",
          marginVertical: 1 * vh,
        }}
        onPress={() => setFilter(true)}
      />
      {filter && (
        <View style={style.modal}>
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
              setFilterText({ ...filterText, toFilter: "status" });
              setFilter2(true);
            }}
          >
            <TextField value={"status"} />
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
          <TouchableOpacity
            onPress={() => {
              setFilter(false);
              setFilterText({ ...filterText, toFilter: "villages" });
              setFilter2(true);
            }}
          >
            <TextField value={"villages"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilter(false);
              setFilterText({ ...filterText, toFilter: "cells" });
              setFilter2(true);
            }}
          >
            <TextField value={"cells"} />
          </TouchableOpacity>
        </View>
      )}
      {filter2 && (
        <View style={style.modal}>
          {filterText.toFilter === "status" &&
            statusFilters.map((option) => {
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
                  }}
                >
                  <TextField value={option} />
                </TouchableOpacity>
              );
            })}
        </View>
      )} */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={style.statCard}>
          <TextField value="Pending Inquiries" marginBottom={0} fontSize={20} />
          <TextField
            value={
              inquiries.filter((inquiry) => inquiry.status !== "Resolved")
                .length
            }
            marginBottom={0}
            fontSize={40}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <TextField value="Sector level" marginBottom={0} />
              <TextField
                value={
                  inquiries.filter(
                    (inquiry) =>
                      inquiry.sectorSupport && inquiry.status === "sector"
                  ).length
                }
                marginBottom={0}
                fontSize={30}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TextField value="Cell level" marginBottom={0} />
              <TextField
                value={
                  inquiries.filter(
                    (inquiry) =>
                      inquiry.cellSupport && inquiry.status === "cell"
                  ).length
                }
                marginBottom={0}
                fontSize={30}
              />
            </View>
          </View>
        </View>
        <View style={[style.statCard]}>
          <TextField
            value="Resolved Inquiries"
            marginBottom={0}
            fontSize={20}
          />
          <Chart resolved={resolved} inquiries={inquiries} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  statCard: {
    backgroundColor: "#fff",
    width: vw * 47,
    height: 180,
    paddingHorizontal: vw * 2,
    paddingVertical: vh * 1,
    borderRadius: 10,
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
});
