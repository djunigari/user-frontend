import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IAnnouncement from "@core/model/Announcement";
import { UPDATE_ANNOUNCEMENT } from "@frontend/lib/apollo-client/mutations/Announcement/UpdateAnnouncement";

interface useUpdateAnnouncementProps {
	callbackSuccess?: (value?: IAnnouncement) => void;
	callbackFail?: () => void;
}
function useUpdateAnnouncement({
	callbackSuccess,
	callbackFail,
}: useUpdateAnnouncementProps) {
	const toast = useToast();

	const [updateProfile, { loading }] = useMutation<{
		updateAnnouncement: IAnnouncement;
	}>(UPDATE_ANNOUNCEMENT, {
		onCompleted: (data) => {
			toast({
				title: "Anúncio alterado com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess(data.updateAnnouncement);
		},
		onError: (error) => {
			console.error("UPDATE_ANNOUNCEMENT", error.graphQLErrors);
			toast({
				title: `Erro ao savar alteraçōes`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const save = async (
		token: string,
		id: string,
		name: string,
		url: string
	) => {
		updateProfile({
			variables: { id, name, url },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};
	return { save, loading };
}

export default useUpdateAnnouncement;
