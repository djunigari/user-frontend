import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	VStack,
} from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import useEditAnnouncement from "@frontend/hooks/announcement/useEditAnnouncement";
import useAuth from "@frontend/hooks/data/useAuth";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AddAnnouncementPage() {
	const { user } = useAuth();
	const router = useRouter();

	const {
		announcement,
		setAnnouncementId,
		name,
		url,
		setName,
		setUrl,
		reset,
		update,
		loadingUpdate,
	} = useEditAnnouncement({});

	useEffect(() => {
		setAnnouncementId(router.query.id?.toString() || "");
	}, [router.query.id]);

	if (!user || user.plan === TypeProfile.FREE)
		return (
			<Flex w="full" h="full" maxW="720px">
				<Text>Acesso negado!</Text>
			</Flex>
		);

	if (!announcement)
		return (
			<Flex w="full" h="full" maxW="720px">
				<Text>Nenhum anúncio encontrado!</Text>
			</Flex>
		);

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			align="center"
			justify="center"
			m={2}
		>
			<VStack borderRadius="md" p={2} bg="white" w="full" maxW="720px">
				<Text fontWeight="semibold" fontSize="xs" alignSelf="end">
					{moment(announcement.createdAt).format("DD/MM/yy")}
				</Text>
				<Image src={announcement?.imageUrl} />
				<FormControl>
					<FormLabel>Nome:</FormLabel>

					<Input
						value={name || ""}
						placeholder=""
						onChange={(e) => setName(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Redirecionar para o link:</FormLabel>

					<InputGroup size="sm">
						<InputLeftAddon children="https://" />
						<Input
							value={url || ""}
							placeholder="www.meusite.com"
							onChange={(e) => setUrl(e.target.value)}
						/>
					</InputGroup>
				</FormControl>

				<HStack alignSelf="end">
					<Button
						colorScheme="green"
						variant="solid"
						w="full"
						onClick={() => update(user.token)}
						isLoading={loadingUpdate}
					>
						Salvar
					</Button>
					<Button
						colorScheme="red"
						variant="solid"
						w="full"
						onClick={reset}
					>
						Cancelar
					</Button>
				</HStack>
			</VStack>
		</Flex>
	);
}

export default AddAnnouncementPage;
