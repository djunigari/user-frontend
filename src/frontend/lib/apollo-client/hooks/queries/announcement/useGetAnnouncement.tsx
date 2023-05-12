import { useLazyQuery } from "@apollo/client";
import IAnnouncement from "@core/model/Announcement";
import { GET_ANNOUNCEMENT } from "@frontend/lib/apollo-client/queries/Announcement/GetAnnouncement";

interface useGetAnnouncementProps {
	callbackSuccess?: (value?: IAnnouncement) => void;
	callbackFail?: () => void;
}

function useGetAnnouncement({
	callbackSuccess,
	callbackFail,
}: useGetAnnouncementProps) {
	const [search, { called, loading, refetch }] = useLazyQuery<{
		announcement: IAnnouncement;
	}>(GET_ANNOUNCEMENT, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data.announcement);
		},
		onError: (error) => {
			console.error("GET_ANNOUNCEMENT", error.graphQLErrors);
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (id: string) => {
		if (called) {
			refetch({ id });
		} else {
			search({
				variables: { id },
			});
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetAnnouncement;
