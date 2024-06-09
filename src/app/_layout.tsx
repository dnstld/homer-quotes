import { Stack } from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://api.api-ninjas.com/v1/quotes",
  headers: {
    "X-Api-Key": `20ZVM+KgCtg1b+UA1/fVmQ==7NBfOWkyJWb8gcxe`,
  },
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
