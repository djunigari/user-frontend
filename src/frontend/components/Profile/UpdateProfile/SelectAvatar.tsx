import { Avatar, Button, Flex, useDisclosure, VStack } from "@chakra-ui/react";
import useNewProfileImageSelectedState from "@frontend/hooks/recoil/useNewProfileImageSelectedState";
import ProfileImageModal from "./ProfileImageModal/ProfileImageModal";

interface SelectImageProps {
	imageUrl: string;
}

function SelectAvatar({ imageUrl }: SelectImageProps) {
	const { newProfileImageSelected } = useNewProfileImageSelectedState();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<VStack>
			<ProfileImageModal isOpen={isOpen} onClose={onClose} />
			<Flex>
				<Avatar
					alignSelf="center"
					size="2xl"
					src={newProfileImageSelected?.src || imageUrl || ""}
				/>
				<Button size="xs" onClick={() => onOpen()}>
					Add
				</Button>
			</Flex>
		</VStack>
	);
}

export default SelectAvatar;
