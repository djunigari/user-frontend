import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra/theme";
import Layout from "@frontend/components/Layout/Layout";
import { AuthProvider } from "@frontend/context/AuthContext";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import apolloClient from "@frontend/lib/apollo-client/apollo";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Catálogo Japão</title>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
			</Head>
			<AuthProvider>
				<RecoilRoot>
					<ApolloProvider client={apolloClient}>
						<ChakraProvider theme={theme}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ChakraProvider>
					</ApolloProvider>
				</RecoilRoot>
			</AuthProvider>
		</>
	);
}

export default MyApp;
