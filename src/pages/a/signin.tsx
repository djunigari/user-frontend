import { Button, Flex, Icon, Link, Text } from "@chakra-ui/react";
import useAuth from "@frontend/hooks/data/useAuth";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
	const { user, signIn, loading } = useAuth();
	const router = useRouter();

	if (user) router.push("/");

	return (
		<Flex direction="column" borderRadius="md" bg="white" shadow="md" p={8}>
			<Text as="u" fontWeight="bold" fontSize="2xl" mb={2}>
				Entrar/Registrar como empresa/profissional:
			</Text>
			<Text fontSize="xs" color="gray.600">
				Ao continuar, você está configurando uma conta no Catálogo Japão
				e concorda com os nossos
				<Link href="/r/termos-de-uso" color="blue.600" mx={1}>
					Termos de Uso
				</Link>
				e a nossa
				<Link href="/r/politica-de-privacidade" color="blue.600" mx={1}>
					Política de Privacidade.
				</Link>
			</Text>

			<Button
				mt={12}
				border="1px solid"
				borderColor="gray.300"
				borderRadius="full"
				onClick={signIn}
				leftIcon={<Icon as={FcGoogle} />}
				isLoading={loading}
			>
				Com Google
			</Button>
		</Flex>
	);
}
