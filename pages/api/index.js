import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import Cors from "micro-cors";
import prisma from "../../lib/prismaClient";

const cors = Cors({
  origin:
    process.env.NODE_ENV === "production"
      ? "https://flipmvptextteachers.vercel.app"
      : "https://studio.apollographql.com",
  credentials: true,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
      prisma,
    };
  },
  csrfPrevention: true,
  cache: "bounded",
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
