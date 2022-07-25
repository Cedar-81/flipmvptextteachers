import Head from "next/head";
import { Teachercontextprovider } from "../components/contexts/teachercontext";
import Layout from "../components/layout";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Teachercontextprovider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Teachercontextprovider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
