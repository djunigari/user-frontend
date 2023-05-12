import useAuth from "@frontend/hooks/data/useAuth";
import MenuIcons from "./MenuIcons";
import UserMenuIcons from "./UserMenuIcons";

interface Props {
	onClose: () => void;
}

function MenuMobile({ onClose }: Props) {
	const { user } = useAuth();

	if (!user) return <MenuIcons onClose={onClose} />;

	return <UserMenuIcons onClose={onClose} />;
}

export default MenuMobile;
