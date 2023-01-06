import * as SecureStore from "expo-secure-store";

export const MAIN_COLOR = "#00A1DE";
export const BASE_URL = "https://citizen.onrender.com/api";
export const Action = (type, payload) => ({
  type,
  payload,
});
export const initialState = {
  loading: false,
  error: null,
};

export const storeToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValueForToken = async () => {
  let result = await SecureStore.getItemAsync("token").then((res) => {
    return res;
  });

  return result;
};

export const getUserId = async () => {
  let result = await SecureStore.getItemAsync("userId").then((res) => {
    return res;
  });

  return result;
};

export const removerToken = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("userId");
};
