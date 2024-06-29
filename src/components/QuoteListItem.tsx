import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

interface Props {
  id: string;
  quote: string;
}

const QuoteListItem = ({ quote, id }: Props) => {
  return (
    <Link
      href={{
        pathname: "/share/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable>
        <View>
          <Text style={styles.label}>{quote}</Text>
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
});

export default QuoteListItem;
