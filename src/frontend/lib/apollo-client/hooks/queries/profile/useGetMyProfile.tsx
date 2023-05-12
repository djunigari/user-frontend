import { useLazyQuery } from "@apollo/client";
import IUserProfile from "@core/model/UserProfile";
import { GET_MY_PROFILE } from "@frontend/lib/apollo-client/queries/Profile/GetMyProfile.query";

interface useGetProfileProps {
	callbackSuccess?: (profile: IUserProfile) => void;
	callbackFail?: () => void;
}

function useGetProfile({ callbackSuccess, callbackFail }: useGetProfileProps) {
	const [search, { called, loading, refetch }] = useLazyQuery<{
		myProfile: IUserProfile;
	}>(GET_MY_PROFILE, {
		onCompleted: (data) => {
			callbackSuccess && callbackSuccess(data?.myProfile);
		},
		onError: (error) => {
			console.error("GET_PROFILE", error.graphQLErrors);
			callbackFail && callbackFail();
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (token: string) => {
		if (called) {
			refetch();
		} else {
			search({
				context: {
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			});
		}
	};

	return {
		loading,
		fetch,
	};
}

export default useGetProfile;
