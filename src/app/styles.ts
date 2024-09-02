import { StyleSheet } from "react-native";

const MAGIC_NUMBER = 32;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00AAFF",
  },
  quoteContainer: {
    flex: 1,
    paddingVertical: MAGIC_NUMBER * 2,
    paddingHorizontal: MAGIC_NUMBER,
  },
  episodeContainer: {
    marginBottom: 64,
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ep: {
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  actionsContainer: {
    gap: 16,
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    right: 32,
    bottom: 32,
  },
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
  buttonText: {
    color: "white",
  },
  buttonTextPrimary: {
    color: "#F8659F",
    elevation: 3,
  },
});
