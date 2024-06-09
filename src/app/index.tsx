import { Link } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import FoodListItem from "../components/FoodListItem";

const FoodItems = [
  {
    food: {
      label: "Pizza",
      brand: "Dominos",
      nutrients: { ENERC_KCAL: 300 },
    },
  },
  {
    food: {
      label: "Burger",
      brand: "McDonalds",
      nutrients: { ENERC_KCAL: 500 },
    },
  },
  {
    food: {
      label: "Pasta",
      brand: "Olive Garden",
      nutrients: { ENERC_KCAL: 400 },
    },
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's logged food</Text>
      <FlatList
        data={FoodItems}
        renderItem={({ item }) => <FoodListItem {...item} />}
        contentContainerStyle={styles.contentContainer}
      />
      <Link href="/search">Add food</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    gap: 16,
  },
  contentContainer: {
    gap: 4,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
  },
});
