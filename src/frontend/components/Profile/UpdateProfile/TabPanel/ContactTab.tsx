import IUserProfile from "@core/model/UserProfile";
import Contact from "../../Contact";
import Item from "./Item";

interface ContactTabProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ContactTab({
	isLoading,
	cancel,
	save,
	profile,
	setProfileProps,
}: ContactTabProps) {
	return (
		<Item
			title="Contatos"
			isLoading={isLoading}
			cancel={cancel}
			save={save}
		>
			<Contact
				email={profile?.email}
				telephone={profile?.telephone}
				whatsapp={profile?.whatsapp}
				facebook={profile?.facebook}
				instagram={profile?.instagram}
				webSite={profile?.webSite}
				youtube={profile?.youtube}
				setUserProfileProps={setProfileProps}
			/>
		</Item>
	);
}

export default ContactTab;
