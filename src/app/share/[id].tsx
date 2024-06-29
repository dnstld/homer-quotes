import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
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

export default function ShareScreen() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(query);
  const quotes = data?.quotes?.data;

  const quote = quotes?.find(
    (quote: { id: string | undefined }) => quote.id === id
  );

  if (error) return <Text>Error</Text>;

  return (
    <View>
      {loading && <Text>Loading...</Text>}

      <Text>{quote.quote}</Text>
    </View>
  );
}
