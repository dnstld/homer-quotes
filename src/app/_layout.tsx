import { Stack, useRouter } from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { Button } from "react-native";

const restLink = new RestLink({
  uri: "https://api.sharedtattoo.com",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const RootLayout = () => {
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Back", headerShown: false }}
        />
        <Stack.Screen name="quotes/index" options={{ headerTitle: "List" }} />
        <Stack.Screen
          name="share/[id]"
          options={{
            headerTitle: "",
            headerLeft: () => (
              <Button title="Close" onPress={() => router.back()} />
            ),
            headerRight: () => <Button title="Share" onPress={() => {}} />,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="settings/index"
          options={{ headerTitle: "Settings" }}
        />
      </Stack>
    </ApolloProvider>
  );
};

export default RootLayout;
