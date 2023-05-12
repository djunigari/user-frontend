import {
	Box,
	Button,
	Flex,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import { auth, firestore } from "@frontend/lib/firebase/clientApp";
import IStripeProduct from "core/model/StripeProduct";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import formatValue from "../utils/formatValue";

interface ProductItemProps {
	product: IStripeProduct;
	isDisabled: boolean;
}

function ProductItem({ product, isDisabled }: ProductItemProps) {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(false);

	const stripeCheckoutHandler = async () => {
		if (!user) return;
		setLoading(true);
		const checkoutSessionDoc = await addDoc(
			collection(firestore, `customers/${user.uid}/checkout_sessions`),
			{
				price: product.prices && product.prices[0].id,
				allow_promotion_codes: true,
				automatic_tax: true,
				tax_id_collection: true,
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			}
		);

		// Wait for the CheckoutSession to get attached by the extension
		onSnapshot(checkoutSessionDoc, (snap) => {
			const { error, url } = snap.data()!;
			if (error) {
				// Show an error to your customer and
				// inspect your Cloud Function logs in the Firebase console.
				alert(`An error occured: ${error.message}`);
				setLoading(false);
			}
			if (url) {
				// We have a Stripe Checkout URL, let's redirect.
				window.location.assign(url);
				setLoading(false);
			}
		});
	};

	const prices = product.prices;

	if (!prices) return null;

	return (
		<Box alignSelf={{ base: "center", lg: "flex-start" }} minW="300px">
			<Text
				w="full"
				fontWeight="bold"
				fontSize="2xl"
				color="white"
				borderTopRadius="md"
				bg="purple.600"
				p={4}
			>
				{product.name}
			</Text>

			<VStack bg="white" p={4}>
				<UnorderedList>
					{product.description.split(",").map((i, index) => (
						<ListItem
							key={index}
							fontSize="sm"
							fontWeight="semibold"
							mb={2}
						>
							{i.trim()}
						</ListItem>
					))}
				</UnorderedList>

				<Flex direction="column" alignSelf="end">
					<Text fontWeight="semibold">
						{`${formatValue(
							prices[0]?.unit_amount,
							prices[0]?.currency
						)}/mês `}
					</Text>
					<Text alignSelf="end" fontSize="x-small">
						(Taxa não incluso)
					</Text>
				</Flex>
			</VStack>
			<Button
				w="full"
				borderTopRadius="none"
				variant="solid"
				colorScheme="green"
				onClick={stripeCheckoutHandler}
				isLoading={loading}
				isDisabled={isDisabled}
			>
				Fazer assinatura
			</Button>
		</Box>
	);
}

export default ProductItem;
