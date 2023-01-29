import { Picker } from "@react-native-picker/picker";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
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
  editable = true,
  width = "100%",
  marginBottom = 2 * vh,
  icon = null,
  multiline = false,
}) => {
  return (
    <View>
      {label && (
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
      )}
      {picker ? (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 7,
            paddingHorizontal: 1 * vmax,
            marginBottom: marginBottom,
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
            marginBottom: marginBottom,
            width: "100%",
            maxHeight: 15 * vh,
          }}
          editable={editable}
        />
      ) : (
        <>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#c9c9c9"}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            // maxLength={label === "Phone" && 10}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 7,
              padding: 1 * vmax,
              alignItems: "center",
              fontFamily: "Poppins_400Regular",
              marginBottom: marginBottom,
              width: width,
            }}
            editable={editable}
          />
          <View
            style={{
              position: "absolute",
              bottom: 22,
              right: 10,
            }}
          >
            {icon}
          </View>
        </>
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
    <View>
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
