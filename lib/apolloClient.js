import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://flip-mvp-test.herokuapp.com/api",
  cache: new InMemoryCache(),
});

export default apolloClient;
//http://localhost:3001/api
