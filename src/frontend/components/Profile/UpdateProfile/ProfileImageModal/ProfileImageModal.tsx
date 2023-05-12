import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import SelectFile from "@frontend/components/SelectFile/SelectFile";
import useNewProfileImageSelectedState from "@frontend/hooks/recoil/useNewProfileImageSelectedState";

interface ProfileImageModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function ProfileImageModal({ isOpen, onClose }: ProfileImageModalProps) {
	const { newProfileImageSelected, setNewProfileImageSelected } =
		useNewProfileImageSelectedState();

	const closeModal = () => {
		// reset();
		onClose();
	};

	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={closeModal}
			scrollBehavior="inside"
			size="6xl"
		>
			<ModalOverlay
				bg="none"
				backdropFilter="auto"
				backdropInvert="80%"
				backdropBlur="2px"
			/>
			<ModalContent>
				<ModalHeader>Atualizar a foto de perfil</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<SelectFile
						selectedFile={newProfileImageSelected}
						setSelectedFile={setNewProfileImageSelected}
						closeModal={closeModal}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default ProfileImageModal;
