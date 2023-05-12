import {
	Checkbox,
	Flex,
	Grid,
	GridItem,
	Heading,
	Link,
	Text,
} from "@chakra-ui/react";
import useProducts from "@frontend/hooks/stripe/useProducts";
import { useState } from "react";
import ProductItem from "./ProductItem";

function Products() {
	const { products } = useProducts();
	const [accept, setAccept] = useState<boolean>(false);

	return (
		<Flex direction="column">
			<Heading as="h1" fontSize="4xl" mb={4} alignSelf="center">
				Faça parte do Catálogo Japão
			</Heading>

			<Text fontSize="lg" color={"gray.500"}>
				Nós utilizamos Stripe como meio de pagamento!
				<Link
					href="https://stripe.com/pt-br-us"
					isExternal
					color="blue.500"
					mx={1}
				>
					Saber mais...
				</Link>
			</Text>

			<Checkbox
				onChange={(e) => setAccept(e.target.checked)}
				borderColor="gray.600"
				border="1px dashed"
				borderRadius="md"
				bg="gray.300"
				mb={2}
				p={2}
			>
				<Text fontSize="xs" color="gray.600">
					Leia e Aceite os
					<Link href="/r/termos-de-uso" color="blue.600" mx={1}>
						Termos de Uso
					</Link>
					e a
					<Link
						href="/r/politica-de-privacidade"
						color="blue.600"
						mx={1}
					>
						Política de Privacidade
					</Link>
				</Text>
			</Checkbox>

			<Grid
				w="full"
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(3, 1fr)",
				}}
				mt={2}
				gap={4}
			>
				{products.map((product, index) => (
					<GridItem key={index}>
						<ProductItem isDisabled={!accept} product={product} />
					</GridItem>
				))}
			</Grid>
		</Flex>
	);
}

export default Products;
