import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

interface Props {
  id: string;
  quote: string;
}

const QuoteListItem = ({ quote, id, episode, time, name }: Props) => {
  return (
    <Link
      href={{
        pathname: "/share/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.item}>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.episode}>{`Episode ${episode}: ${name}`}</Text>
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
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  quote: {
    fontSize: 18,
  },
  episode: {
    color: "gray",
  },
});

export default QuoteListItem;
