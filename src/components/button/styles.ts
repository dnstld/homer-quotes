import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  buttonPrimary: {
    backgroundColor: "white",
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  buttonBordered: {
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "black",
  },
  buttonTextPrimary: {
    color: "#F8659F",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
