import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IAnnouncement from "@core/model/Announcement";
import { CREATE_ANNOUNCEMENT } from "@frontend/lib/apollo-client/mutations/Announcement/CreateAnnouncement";

interface useAddAnnouncementProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useAddAnnouncement({
	callbackSuccess,
	callbackFail,
}: useAddAnnouncementProps) {
	const toast = useToast();

	const [updateProfile, { loading }] = useMutation<{
		createAnnouncement: IAnnouncement;
	}>(CREATE_ANNOUNCEMENT, {
		onCompleted: () => {
			toast({
				title: "Anúncio adicionado com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CREATE_ANNOUNCEMENT", error.graphQLErrors);
			toast({
				title: `Erro ao adicionar anúncio`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const save = async (token: string, announcement: IAnnouncement) => {
		updateProfile({
			variables: {
				imageUrl: announcement.imageUrl,
				name: announcement.name,
				url: announcement.url,
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};
	return { save, loading };
}

export default useAddAnnouncement;
