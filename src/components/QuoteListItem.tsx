import { View, Text, StyleSheet } from "react-native";

interface Props {
  quote: string;
  author: string;
  category: string;
}

const QuoteListItem = ({ quote, author, category }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{quote}</Text>
        <Text style={styles.brand}>
          {author}: {category}
        </Text>
      </View>
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

export default QuoteListItem;
