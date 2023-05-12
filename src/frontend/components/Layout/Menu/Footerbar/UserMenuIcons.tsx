import {
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import IUser from "@core/model/User";
import useAuth from "@frontend/hooks/data/useAuth";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsGear } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineArticle, MdOutlineContactSupport } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";

interface UserMenuIconsProps {
	user: IUser;
}

interface MenuOption {
	icon: IconType;
	iconColor?: string;
	onClick: () => void;
	name: string;
}

function UserMenuIcons({ user }: UserMenuIconsProps) {
	const router = useRouter();
	const { logout } = useAuth();

	const menuOptions: MenuOption[] = [
		// {
		// 	name: "Meu Plano",
		// 	icon: TbReportMoney,
		// 	iconColor: "green.600",
		// 	onClick: () => router.push("/a/meu-plano"),
		// },
		// {
		// 	name: "Anúncios",
		// 	icon: BiNews,
		// 	iconColor: "blue.600",
		// 	onClick: () => router.push("/a/anuncios"),
		// },
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
		<Menu autoSelect={false}>
			<MenuButton
				maxW="170px"
				bg="gray.600"
				borderRadius="md"
				color="gray.200"
				fontWeight="semibold"
				fontSize="sm"
				px={1}
				cursor="pointer"
			>
				<Flex align="center">
					<Icon as={GiHamburgerMenu} mr={1} />
					<Text noOfLines={1}>
						{user?.displayName || user.email?.split("@")[0]}
					</Text>
				</Flex>
			</MenuButton>

			<MenuList bg="gray.300" minWidth="120px">
				{menuOptions.map((o) => (
					<MenuItem key={o.name} onClick={o.onClick}>
						<Icon as={o.icon} color={o.iconColor} mr={2} />
						<Text fontWeight="semibold" fontSize="xs">
							{o.name}
						</Text>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

export default UserMenuIcons;
