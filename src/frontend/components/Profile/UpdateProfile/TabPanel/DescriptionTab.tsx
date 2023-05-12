import { Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import IUserProfile from "@core/model/UserProfile";
import Classification from "@frontend/components/CustomSelects/Classification/Classification";
import Attendances from "@frontend/components/Layout/Attendances";
import Item from "./Item";

interface Props {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function DescriptionTab({
	isLoading,
	cancel,
	save,
	profile,
	setProfileProps,
}: Props) {
	return (
		<Item
			title="Descrição"
			isLoading={isLoading}
			cancel={cancel}
			save={save}
		>
			<VStack>
				<Text alignSelf="start" fontWeight="bold">
					Descrição
				</Text>
				<Textarea
					minH="400px"
					value={profile?.description || ""}
					placeholder="Escreve aqui todas informaçōes extras que você desejar"
					onChange={(event) =>
						setProfileProps("description", event.target.value)
					}
				/>
			</VStack>
		</Item>
	);
}

export default DescriptionTab;
