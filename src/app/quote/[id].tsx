import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const query = gql`
  query quote {
    quote @rest(type: "Quote", path: "?category={args.id}") {
      quote
      author
      category
    }
  }
`;

export default function QuoteScreen() {
  const { id } = useLocalSearchParams();
  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  useEffect(() => {
    runSearch({ variables: { id } });
  }, []);

  if (error) return <Text>Error</Text>;

  return (
    <View>
      {loading && <Text>Loading...</Text>}

      <Text>{data?.quote[0].quote}</Text>
    </View>
  );
}
