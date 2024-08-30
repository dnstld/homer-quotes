import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { QuoteProps } from "../context/quotes-context";

const QuoteListItem = ({ quote, id, episode, time }: QuoteProps) => {
  return (
    <Link
      href={{
        pathname: "/share/[id]",
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.pressable}>
        <Text style={styles.info}>{`Ep. ${("0" + episode).slice(-2)}.`}</Text>
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            {quote}
            <Text style={styles.time}>{` (${time})`}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    borderBottomColor: "#ffffff33",
    borderBottomWidth: 1,
  },
  quoteContainer: {
    flex: 1,
  },
  quote: {
    fontSize: 16,
    color: "white",
  },
  info: {
    color: "white",
    marginTop: 2,
  },
  time: {
    fontSize: 10,
    color: "white",
  },
});

export default QuoteListItem;
