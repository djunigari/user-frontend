import { Flex, Link, Text } from "@chakra-ui/react";
import UpdateProfile from "@frontend/components/Profile/UpdateProfile/UpdateProfile";
import VerifyPhoneNumber from "@frontend/components/Profile/VerifyPhoneNumber";
import useAuth from "@frontend/hooks/data/useAuth";

function ProfilePage() {
	const { user } = useAuth();

	if (!user)
		return (
			<Flex w="full" h="full" maxW="720px">
				<Text>Acesso negado!</Text>
			</Flex>
		);

	if (!user.phoneNumber) {
		return (
			<Flex direction="column" w="full" h="full" justify="center">
				<Text
					fontSize="xs"
					fontWeight="semibold"
					bg="white"
					borderRadius="md"
					mb={2}
					p={2}
				>
					Precisa de ajuda ou tem alguma dúvida? Entre em contato
					conosco através do nosso instagram{" "}
					<Link href="https://www.instagram.com/catalogojapao">
						@catalogojapao
					</Link>
				</Text>
				<VerifyPhoneNumber title="Adicione um número de celular para criar um perfil" />
			</Flex>
		);
	}

	return (
		<Flex w="full" h="full" justify="center" direction="column">
			<Text
				fontSize="xs"
				fontWeight="semibold"
				bg="white"
				borderRadius="md"
				mb={2}
			>
				Precisa de ajuda ou tem alguma dúvida? Entre em contato conosco
				através do nosso suporte @catalogojapao. Estamos prontos para
				ajudar!
			</Text>
			<UpdateProfile />
		</Flex>
	);
}

export default ProfilePage;
