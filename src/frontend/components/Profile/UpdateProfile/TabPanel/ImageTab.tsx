import IUserProfile from "@core/model/UserProfile";
import SelectAvatar from "../SelectAvatar";
import Item from "./Item";

interface ImageTabProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ImageTab({
	isLoading,
	cancel,
	save,
	profile,
	setProfileProps,
}: ImageTabProps) {
	return (
		<Item title="Foto" isLoading={isLoading} cancel={cancel} save={save}>
			<SelectAvatar imageUrl={profile?.imageUrl as string} />
		</Item>
	);
}

export default ImageTab;
