import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetCells, GetVillages } from "../redux/actions";
import { AppNavigator } from "./app.navigation";

export const RootNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCells());
    dispatch(GetVillages({}));
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
