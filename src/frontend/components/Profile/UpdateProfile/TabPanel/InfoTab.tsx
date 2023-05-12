import { Input, Text, VStack } from "@chakra-ui/react";
import { Attendance } from "@core/enums/Attendance";
import IUserProfile from "@core/model/UserProfile";
import Classification from "@frontend/components/CustomSelects/Classification/Classification";
import Attendances from "@frontend/components/Layout/Attendances";
import Item from "./Item";

interface InfoTabProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	profile?: IUserProfile;
	setProfileProps: (name: string, value: any) => void;
}

function InfoTab({
	isLoading,
	cancel,
	save,
	profile,
	setProfileProps,
}: InfoTabProps) {
	return (
		<Item title="Dados" isLoading={isLoading} cancel={cancel} save={save}>
			<VStack>
				<Text alignSelf="start" fontWeight="bold">
					Nome da Empresa ou seu Nome
				</Text>
				<Input
					value={profile?.displayName || ""}
					type="text"
					onChange={(event) =>
						setProfileProps("displayName", event.target.value)
					}
				/>

				<Attendances
					attendances={profile?.attendances}
					setAttendances={(value?: Attendance[] | []) => {
						setProfileProps("attendances", value);
					}}
					resetPrefectureAndCityCode={() => {
						setProfileProps("prefectureCode", undefined);
						setProfileProps("cityCode", undefined);
					}}
				/>

				<Classification
					category={profile?.category}
					subCategory={profile?.subCategory}
					setCategory={(value?: string) => {
						setProfileProps("category", value);
					}}
					setSubCategory={(value?: string) => {
						setProfileProps("subCategory", value);
					}}
				/>
			</VStack>
		</Item>
	);
}

export default InfoTab;
