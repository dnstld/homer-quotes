import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  item: { label: string; cal: number; brand: string };
}

const FoodListItem = ({ item }: Props) => {
  const { label, cal, brand } = item;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.brand}>
          {cal} cal, {brand}
        </Text>
      </View>
      <AntDesign name="pluscircleo" size={24} color="royalblue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
    padding: 16,
    gap: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontWeight: "bold", fontSize: 16 },
  brand: { color: "dimgray" },
});

export default FoodListItem;
