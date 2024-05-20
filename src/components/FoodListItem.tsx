import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  food: {
    label: string;
    nutrients: { ENERC_KCAL: number };
  };
}

const FoodListItem = ({ food }: Props) => {
  const { label, nutrients } = food;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.brand}>
          {nutrients?.ENERC_KCAL} cal, {label}
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
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontWeight: "bold", fontSize: 16 },
  brand: { color: "dimgray" },
});

export default FoodListItem;
