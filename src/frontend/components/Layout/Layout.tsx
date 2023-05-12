import { Flex, Spacer } from "@chakra-ui/react";
import Div100vh from "react-div-100vh";
import Consent from "./Consent/Consent";
import Footerbar from "./Menu/Footerbar/Footerbar";
import Navbar from "./Menu/Navbar/Navbar";

interface LayoutProps {
	children: any;
}

function Layout({ children }: LayoutProps) {
	return (
		<Flex as={Div100vh} direction="column" w="100vw">
			<Navbar />
			<Flex
				direction="column"
				zIndex={1}
				as="main"
				position="relative"
				w="full"
				overflow="scroll"
				bg="gray.100"
				flexGrow={1}
				align="center"
				p={2}
			>
				<Flex w="full" maxW="2xl" p={{ base: 2, md: 8 }}>
					{children}
				</Flex>
				<Spacer />
				<Flex
					fontSize="xs"
					fontWeight="semibold"
					justify="end"
					w="full"
					p={2}
					mt={4}
				>
					Copyright ©2023 - Catálogo Japão
				</Flex>
			</Flex>
			<Footerbar />
			<Consent />
		</Flex>
	);
}

export default Layout;
