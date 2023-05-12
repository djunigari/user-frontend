import { Flex, Spinner, Text } from "@chakra-ui/react";
import useAuth from "@frontend/hooks/data/useAuth";
import { auth } from "@frontend/lib/firebase/clientApp";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";

function Login() {
	const { signIn, loading, setLoading } = useAuth();

	useEffect(() => {
		if (window.sessionStorage.getItem("pending")) {
			window.sessionStorage.removeItem("pending");
			setLoading!(true);
			getRedirectResult(auth).then((result) => {
				setLoading!(false);
			});
		}
	}, []);

	return (
		<Flex
			direction="column"
			cursor="pointer"
			fontSize={{ base: "xs", md: "sm" }}
			fontWeight="semibold"
			borderColor="green"
			borderRadius="md"
			bg="gray.100"
			py={1}
			px={2}
			_hover={{ bg: "green.50" }}
			onClick={signIn}
		>
			{loading ? <Spinner /> : <Text>Entrar/Registrar</Text>}
		</Flex>
	);
}

export default Login;
