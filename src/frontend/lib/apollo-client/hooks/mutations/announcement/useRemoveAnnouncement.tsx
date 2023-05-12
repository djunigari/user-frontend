import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IAnnouncement from "@core/model/Announcement";
import { REMOVE_ANNOUNCEMENT } from "@frontend/lib/apollo-client/mutations/Announcement/RemoveAnnouncment";

interface useRemoveAnnouncementProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useRemoveAnnouncement({
	callbackSuccess,
	callbackFail,
}: useRemoveAnnouncementProps) {
	const toast = useToast();

	const [removeAnnouncement, { loading }] = useMutation<{
		removeAnnouncement: IAnnouncement;
	}>(REMOVE_ANNOUNCEMENT, {
		onCompleted: () => {
			toast({
				title: "Anúncio removido com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("REMOVE_ANNOUNCEMENT", error.graphQLErrors);
			toast({
				title: `Erro ao remover anúncio`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const remove = async (token: string, id: string) => {
		removeAnnouncement({
			variables: { id },
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};
	return { remove, loading };
}

export default useRemoveAnnouncement;
