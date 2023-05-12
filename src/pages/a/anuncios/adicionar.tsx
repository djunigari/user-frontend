import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import SelectImage from "@frontend/components/Announcements/SelectImage";
import useCreateAnnouncement from "@frontend/hooks/announcement/useCreateAnnouncement";
import useAuth from "@frontend/hooks/data/useAuth";

function AddAnnouncementPage() {
	const { user } = useAuth();
	const {
		name,
		url,
		selectedImage,
		setName,
		setUrl,
		setSelectedImage,
		create,
		loading,
		reset,
	} = useCreateAnnouncement({});

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
			mt={2}
		>
			<VStack borderRadius="md" p={2} bg="white" w="full" maxW="720px">
				<SelectImage
					selectedFile={selectedImage}
					setSelectedFile={setSelectedImage}
				/>
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
						onClick={create}
						isLoading={loading}
					>
						Adicionar
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
