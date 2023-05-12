import { Box, Flex, HStack, Show, Spacer, Text } from "@chakra-ui/react";
import Logo from "./Logo";
import Menu from "./Menu";

function Navbar() {
	return (
		<Flex direction="column" bg="gray.300" p={2} position="static">
			<HStack w="full" align="center">
				<Logo />
				<Spacer />
				<Show breakpoint="(min-width: 768px)">
					<Text
						fontSize={{ base: "xs", md: "lg" }}
						fontWeight="bold"
						color="gray.600"
					>
						Área para empresas e profissionais.
					</Text>
				</Show>
				<Menu />
			</HStack>
		</Flex>
	);
}

export default Navbar;
