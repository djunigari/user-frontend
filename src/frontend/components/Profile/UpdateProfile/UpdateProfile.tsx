import {
	Button,
	Flex,
	Heading,
	Skeleton,
	Stack,
	Tab,
	TabList,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import useEditProfile from "@frontend/hooks/profile/useEditProfile";
import AddressTab from "./TabPanel/AddressTab";
import ContactTab from "./TabPanel/ContactTab";
import DescriptionTab from "./TabPanel/DescriptionTab";
import ImageTab from "./TabPanel/ImageTab";
import InfoTab from "./TabPanel/InfoTab";
import ServicesTab from "./TabPanel/ServicesTab";

function UpdateProfile() {
	const {
		profile,
		setProfileProps,
		setAddressProps,
		update,
		cancel,
		loadingFetch,
		loading,
	} = useEditProfile({});

	if (loadingFetch)
		return (
			<Stack
				w="full"
				maxW="720px"
				h="full"
				mt={4}
				bg="white"
				borderRadius="md"
				shadow="md"
				p={2}
			>
				<Skeleton height="20px" />
				<Skeleton height="20px" />
				<Skeleton height="20px" />
				<Skeleton height="20px" />
				<Skeleton height="20px" />
				<Skeleton height="20px" />
			</Stack>
		);

	return (
		<Flex direction="column" w="full" maxW="720px" p={2}>
			<Heading
				lineHeight={1.1}
				fontSize={{ base: "2xl", sm: "3xl" }}
				mb={2}
			>
				Editar Perfil
			</Heading>

			<Flex direction="column">
				<InfoTab
					profile={profile}
					setProfileProps={setProfileProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
				<ImageTab
					profile={profile}
					setProfileProps={setProfileProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
				<ContactTab
					profile={profile}
					setProfileProps={setProfileProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
				<AddressTab
					address={profile?.address}
					setAddressProps={setAddressProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
				<ServicesTab
					profile={profile}
					setProfileProps={setProfileProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
				<DescriptionTab
					profile={profile}
					setProfileProps={setProfileProps}
					isLoading={loading}
					cancel={cancel}
					save={update}
				/>
			</Flex>
		</Flex>
	);
}

export default UpdateProfile;
