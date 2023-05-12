import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	useDisclosure,
	Flex,
} from "@chakra-ui/react";
import React from "react";

interface Props {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	title: string;
	children: any;
}

function Item({ isLoading, save, cancel, title, children }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleCancel = () => {
		cancel();
		onClose();
	};

	const handleSave = () => {
		save();
		onClose();
	};

	return (
		<>
			<Button onClick={onOpen} m={2} colorScheme="purple">
				{title}
			</Button>
			<Drawer
				isOpen={isOpen}
				size={{ base: "full", md: "xl" }}
				onClose={handleCancel}
			>
				<DrawerOverlay />
				<DrawerContent overflow="scroll" maxH="100% !important">
					<DrawerCloseButton zIndex={999} />
					<DrawerHeader borderBottomWidth="1px" pos="sticky">
						Editar {title}
					</DrawerHeader>

					<DrawerBody>{children}</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button variant="outline" mr={3} onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							colorScheme="blue"
							isLoading={isLoading}
							onClick={handleSave}
						>
							Salvar
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Item;
