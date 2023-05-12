import { Box, Flex, Show, Text } from "@chakra-ui/react";

function Footerbar() {
	return (
		<Show breakpoint="(max-width: 767px)">
			<Box
				display="block"
				w="full"
				h="40px"
				left={0}
				bottom={0}
				px={2}
				bg="gray.100"
			/>

			<Flex
				position="fixed"
				zIndex={200}
				left={0}
				bottom={0}
				bg="gray.300"
				w="full"
				justify="space-between"
				align="center"
				h="40px"
				px={2}
			>
				<Text
					fontSize={{ base: "xs", md: "lg" }}
					fontWeight="bold"
					color="gray.600"
				>
					Área para empresas e profissionais.
				</Text>
			</Flex>
		</Show>
	);
}

export default Footerbar;
