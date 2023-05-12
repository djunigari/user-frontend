import IUserProfile from "@core/model/UserProfile";
import ServiceInfo from "../ServiceInfo";
import Item from "./Item";

interface ServicesTabProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function ServicesTab({
	isLoading,
	cancel,
	save,
	profile,
	setProfileProps,
}: ServicesTabProps) {
	return (
		<Item
			title="Serviços"
			isLoading={isLoading}
			cancel={cancel}
			save={save}
		>
			<ServiceInfo
				services={profile?.services || []}
				setServices={(services: string[]) =>
					setProfileProps("services", services)
				}
			/>
		</Item>
	);
}

export default ServicesTab;
