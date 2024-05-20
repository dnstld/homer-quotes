import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  Keyboard,
} from "react-native";

import FoodListItem from "../components/FoodListItem";
import { useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";

const query = gql`
  query search($ingr: String!) {
    search(ingr: $ingr)
      @rest(type: "Search", path: "&ingr={args.ingr}&nutrition-type=cooking") {
      id @export(as: "searchId")
      text
      hints {
        food {
          foodId
          label
          brand
          nutrients {
            ENERC_KCAL
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  if (error) return <Text>Error</Text>;

  const performSearch = () => {
    runSearch({
      variables: { ingr: search },
    });
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={data?.search?.hints}
        renderItem={({ item }) => {
          return <FoodListItem {...item} />;
        }}
        ListEmptyComponent={
          <Text>{`${loading ? "Searching" : "Search for something!"}`}</Text>
        }
        contentContainerStyle={{ gap: 4 }}
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
  input: {
    backgroundColor: "gainsboro",
    padding: 16,
    borderRadius: 8,
  },
});
