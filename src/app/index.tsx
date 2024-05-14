import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import FoodListItem from "../components/FoodListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FoodListItem item={{ label: "Pizza", cal: 75, brand: "Dominos" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    gap: 4,
  },
});
