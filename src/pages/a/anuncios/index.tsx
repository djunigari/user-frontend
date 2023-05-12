import { Button, Flex, Text } from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import Announcements from "@frontend/components/Announcements/Announcements";
import useAuth from "@frontend/hooks/data/useAuth";
import { useRouter } from "next/router";

function AnnouncementPage() {
	const { user } = useAuth();
	const router = useRouter();
	if (!user || user.plan === TypeProfile.FREE)
		return (
			<Flex w="full" h="full" maxW="720px">
				<Text>Acesso negado!</Text>
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
			<Button
				alignSelf="end"
				m={2}
				colorScheme="blue"
				onClick={() => router.push("/a/anuncios/adicionar")}
			>
				Adicionar novo anúncio
			</Button>
			<Announcements user={user} />
		</Flex>
	);
}

export default AnnouncementPage;
