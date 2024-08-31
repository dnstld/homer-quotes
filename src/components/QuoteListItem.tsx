import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { QuoteProps } from "../context/quotes-context";

type Props = QuoteProps & {
  even: boolean;
};

const QuoteListItem = ({ quote, id, episode, time, even }: Props) => {
  const backgroundColor = even ? "white" : "#00aaff05";
  return (
    <Link
      href={{
        pathname: "/share/[id]",
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity style={{ ...styles.pressable, backgroundColor }}>
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
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
  },
  quoteContainer: {
    flex: 1,
  },
  quote: {
    fontSize: 16,
  },
  info: {
    marginTop: 2,
  },
  time: {
    fontSize: 10,
  },
});

export default QuoteListItem;
