import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, Text } from "react-native";

import QuoteListItem from "../../components/QuoteListItem";

import { gql, useQuery } from "@apollo/client";

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

export default function QuotesScreen() {
  const { data, loading, error } = useQuery(query);
  const quotes = data?.quotes?.data;

  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading && <Text>Loading...</Text>}
      <FlatList
        data={quotes}
        renderItem={({ item }) => {
          return <QuoteListItem {...item} />;
        }}
        ListEmptyComponent={<Text>Empty</Text>}
        contentContainerStyle={styles.contentContainer}
      />
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
});
