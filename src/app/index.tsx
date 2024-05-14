import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, TextInput, Button } from "react-native";

import FoodListItem from "../components/FoodListItem";
import { useState } from "react";

const arr = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Pizza", cal: 75, brand: "Dominos" },
];

export default function App() {
  const [search, setSearch] = useState("");

  const performSearch = () => {
    console.log("Search performed", search);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}
      <FlatList
        data={arr}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    gap: 8,
  },
  input: {
    backgroundColor: "gainsboro",
    padding: 16,
    borderRadius: 8,
  },
});
