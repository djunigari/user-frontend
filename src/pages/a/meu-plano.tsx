import { Flex } from "@chakra-ui/react";
import MyPlan from "@frontend/components/stripe/MyPlan/MyPlan";
import Products from "@frontend/components/stripe/Products/Products";
import useAuth from "@frontend/hooks/data/useAuth";
import { auth } from "@frontend/lib/firebase/clientApp";
import { useEffect, useState } from "react";

function MyPlanPage() {
	return (
		<Flex w="full" h="full" align="center" justify="center">
			Acesso negado, faça seu login.
		</Flex>
	);

	const { user } = useAuth();
	const [plan, setPlan] = useState("");

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const decodedToken = await user?.getIdTokenResult(true);
				setPlan(decodedToken?.claims.stripeRole);
			}
		});
	}, []);

	if (!user)
		return (
			<Flex w="full" h="full" align="center" justify="center">
				Acesso negado, faça seu login.
			</Flex>
		);

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			align="center"
			justify="center"
		>
			{plan && (
				<Flex w="full" h="full" align="center" justify="center">
					<MyPlan />
				</Flex>
			)}
			<Flex w="full" h="full" align="center" justify="center">
				<Products />
			</Flex>
		</Flex>
	);
}

export default MyPlanPage;
