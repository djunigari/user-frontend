import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	HStack,
	IconButton,
	Image,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import IAnnouncement from "@core/model/Announcement";
import useAuth from "@frontend/hooks/data/useAuth";
import useRemoveAnnouncement from "@frontend/lib/apollo-client/hooks/mutations/announcement/useRemoveAnnouncement";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

interface AnnouncementItemProps {
	announcement: IAnnouncement;
}

function AnnouncementItem({ announcement }: AnnouncementItemProps) {
	const router = useRouter();
	const { user } = useAuth();

	const { remove, loading } = useRemoveAnnouncement({
		callbackSuccess: () => router.push("/a/anuncios"),
	});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Flex
				direction="column"
				w="full"
				borderRadius="md"
				bg="white"
				shadow="md"
				p={2}
			>
				<HStack
					w="full"
					align="center"
					justify="end"
					mb={2}
					spacing={1}
				>
					<Text fontSize="sm" fontWeight="bold" noOfLines={1}>
						{announcement.name}
					</Text>
					<Spacer />
					<IconButton
						size="sm"
						variant="outline"
						colorScheme="green"
						aria-label="Editar"
						icon={<FiEdit />}
						border="none"
						onClick={() =>
							router.push(
								`/a/anuncios/editar?id=${announcement.id}`
							)
						}
					/>
					<IconButton
						size="sm"
						variant="outline"
						colorScheme="red"
						aria-label="Excluir"
						icon={<MdDeleteForever />}
						border="none"
						onClick={onOpen}
					/>
				</HStack>
				<Image src={announcement.imageUrl} w="full" />
				<Text fontWeight="semibold" fontSize="xs" alignSelf="end">
					{moment(new Date(announcement.createdAt)).format(
						"DD/MM/yy"
					)}
				</Text>
			</Flex>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={deleteRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Confirmar exclusão do anúncio
						</AlertDialogHeader>

						<AlertDialogFooter>
							<Button ref={deleteRef} onClick={onClose}>
								Cancelar
							</Button>
							<Button
								colorScheme="red"
								onClick={() => {
									remove(user?.token || "", announcement.id);
									onClose();
								}}
								ml={3}
								isLoading={loading}
							>
								Excluir
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default AnnouncementItem;
