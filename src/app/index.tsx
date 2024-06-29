import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable } from "react-native";

import { gql, useQuery } from "@apollo/client";
import { Link } from "expo-router";

const query = gql`
  query quotes {
    quotes @rest(type: "Quote", path: "/") {
      id
      data {
        id
        season
        episode
        time
        name
        quote
      }
    }
  }
`;

export default function IndexScreen() {
  const { data, loading, error } = useQuery(query);
  const quotes = data?.quotes?.data;
  const selectedQuote = quotes[0];

  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading && <Text>Loading...</Text>}
      <View style={styles.quote}>
        <Text>{selectedQuote.quote}</Text>
      </View>
      <View style={{ padding: 50, gap: 16 }}>
        <Link
          href={{
            pathname: "/share/[id]",
            params: { id: selectedQuote?.id },
          }}
          asChild
        >
          <Pressable>
            <Text>Share</Text>
          </Pressable>
        </Link>
        <Pressable onPress={() => {}}>
          <Text>Quote me!</Text>
        </Pressable>
        <Link href={"quotes"} asChild>
          <Pressable>
            <Text>List</Text>
          </Pressable>
        </Link>
        <Link href={"settings"} asChild>
          <Pressable>
            <Text>Settings</Text>
          </Pressable>
        </Link>
      </View>
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
  contentContainer: {
    gap: 4,
  },
  input: {
    backgroundColor: "gainsboro",
    padding: 16,
    borderRadius: 8,
  },
  quote: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
