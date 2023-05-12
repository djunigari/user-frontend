import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import useAuth from "@frontend/hooks/data/useAuth";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsGear } from "react-icons/bs";
import { FaPowerOff, FaUserCircle } from "react-icons/fa";
import { MdOutlineArticle, MdOutlineContactSupport } from "react-icons/md";

interface MenuOption {
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
	name: string;
}

interface Props {
	onClose: () => void;
}

function UserMenuIcons({ onClose }: Props) {
	const router = useRouter();
	const { user, logout } = useAuth();

	const menuOptions: MenuOption[] = [
		{
			name: "Depoimentos",
			icon: MdOutlineArticle,
			iconColor: "blue.600",
			onClick: () => router.push("/a/depoimentos"),
		},
		{
			name: "Atualizar Perfil",
			icon: BsGear,
			iconColor: "gray.600",
			onClick: () => router.push("/a/perfil"),
		},
		{
			name: "Suporte",
			icon: MdOutlineContactSupport,
			iconColor: "orange.600",
			onClick: () => router.push("/suporte"),
		},
		{
			name: "Logout",
			icon: FaPowerOff,
			iconColor: "red.400",
			onClick: () => {
				logout && logout();
			},
		},
	];

	return (
		<VStack align="start">
			<Flex align="center" alignSelf="center">
				<Icon as={FaUserCircle} mr={1} />
				<Text fontSize="xs" fontWeight="semibold" mr={1}>
					Bem vindo!
				</Text>
				<Text noOfLines={1} fontSize="xs" fontWeight="semibold" as="u">
					{user?.displayName || user?.email?.split("@")[0]}
				</Text>
			</Flex>
			{menuOptions.map((o) => (
				<Flex
					key={o.name}
					onClick={() => {
						onClose();
						o.onClick();
					}}
					cursor="pointer"
				>
					<Icon as={o.icon} color={o.iconColor} mr={2} />
					<Text fontWeight="semibold" fontSize="sm">
						{o.name}
					</Text>
				</Flex>
			))}
		</VStack>
	);
}

export default UserMenuIcons;
