import { Stack } from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: `${process.env.EXPO_PUBLIC_EDEMAM_ENDPOINT}?app_id=${process.env.EXPO_PUBLIC_EDEMAM_API_ID}&app_key=${process.env.EXPO_PUBLIC_EDEMAM_APP_KEY}`,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;
