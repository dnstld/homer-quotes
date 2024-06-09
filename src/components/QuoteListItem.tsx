import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

interface Props {
  quote: string;
  author: string;
  category: string;
}

const QuoteListItem = ({ quote, author, category }: Props) => {
  return (
    <Link
      href={{
        pathname: "/quote/[id]",
        params: { id: "design" },
      }}
      asChild
    >
      <Pressable>
        <View>
          <Text style={styles.label}>{quote}</Text>
          <Text style={styles.brand}>
            {author}: {category}
          </Text>
        </View>
      </Pressable>
    </Link>
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
