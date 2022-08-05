import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "https://flipmvptextteachers.vercel.app/api",
  cache: new InMemoryCache(),
});

export default apolloClient;
//
