import { Picker } from "@react-native-picker/picker";
import { Text, TextInput, View } from "react-native";
import { vh, vmax, vw } from "../utils/units";

export const Input = ({
  label = "",
  value = {},
  onChangeText = {},
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  picker = false,
  onValueChange = {},
  toPicker = {},
}) => {
  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 4.5 * vw,
          fontFamily: "Poppins_400Regular",
          marginBottom: 0.5 * vh,
          marginLeft: 1 * vw,
        }}
      >
        {label}
      </Text>
      {picker ? (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 7,
            paddingHorizontal: 1 * vmax,
            marginBottom: 2 * vh,
            height: "auto",
          }}
        >
          {toPicker}
        </View>
      ) : label === "Description" ? (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#c9c9c9"}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          multiline={true}
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 7,
            padding: 1 * vmax,
            fontFamily: "Poppins_400Regular",
            marginBottom: 2 * vh,
            width: "100%",
            maxHeight: 15 * vh,
          }}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#c9c9c9"}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 7,
            padding: 1 * vmax,
            alignItems: "center",
            fontFamily: "Poppins_400Regular",
            marginBottom: 2 * vh,
            width: "100%",
          }}
        />
      )}
    </View>
  );
};

export const TextField = ({
  value = "",
  fontSize,
  fontFamily = "Poppins_400Regular",
  marginBottom = 2 * vh,
  textColor = "#000",
}) => {
  return (
    <View style={{}}>
      <Text
        style={{
          alignItems: "center",
          fontFamily: fontFamily,
          marginBottom: marginBottom,
          width: "100%",
          fontSize: fontSize,
          maxWidth: "100%",
          color: textColor,
        }}
      >
        {value}
      </Text>
    </View>
  );
};
