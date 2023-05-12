import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import useCurrentPackage from "@frontend/hooks/stripe/useCurrentPackage";
import { useState } from "react";
import formatValue from "../utils/formatValue";

function MyPlan() {
	const [loadingStripeLink, setLoadingStripeLink] = useState(false);

	const { createStripePortalLink, currentPackage, currentProduct } =
		useCurrentPackage();

	const changePackage = async () => {
		setLoadingStripeLink(true);
		const url = await createStripePortalLink();
		window.location.assign(url);
		setLoadingStripeLink(false);
	};

	if (!currentProduct) return null;

	return (
		<Stack spacing={{ base: 6, md: 10 }}>
			<Box as={"header"}>
				<Heading
					fontWeight="bold"
					fontSize={{
						base: "2xl",
						sm: "4xl",
						lg: "5xl",
					}}
				>
					{currentProduct.name}
				</Heading>
				<Text fontSize={"xl"}>
					{`* Você está pagando ${formatValue(
						currentPackage!.unit_amount,
						currentPackage!.currency
					)}/Mês`}
				</Text>
			</Box>

			<Text fontSize={"2xl"} fontWeight={"300"}>
				{currentProduct.description}
			</Text>

			<Button
				rounded={"none"}
				w={"full"}
				mt={8}
				size={"lg"}
				py={"7"}
				bg={"gray.900"}
				color={"white"}
				_hover={{
					bg: "gray.600",
				}}
				onClick={changePackage}
				isLoading={loadingStripeLink}
			>
				Alterar/Cancelar Plano
			</Button>
		</Stack>
	);
}

export default MyPlan;
