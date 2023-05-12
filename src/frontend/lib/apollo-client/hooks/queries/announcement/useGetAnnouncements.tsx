import { useLazyQuery } from "@apollo/client";
import IAnnouncement from "@core/model/Announcement";
import { IPageInfo } from "@core/model/PageInfo";
import { GET_MY_ANNOUNCEMENTS } from "@frontend/lib/apollo-client/queries/Announcement/GetMyAnnouncements";
import { useState } from "react";

interface useGetMyAnnouncementsProps {
	take?: number;
}

function useGetMyAnnouncements({ take = 10 }: useGetMyAnnouncementsProps) {
	const [resultList, setResultList] = useState<IAnnouncement[]>([]);
	const [pageInfo, setPageInfo] = useState<IPageInfo>();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		myAnnouncements: {
			pageInfo: IPageInfo;
			list: IAnnouncement[];
		};
	}>(GET_MY_ANNOUNCEMENTS, {
		onCompleted: (data) => {
			setPageInfo(data.myAnnouncements?.pageInfo);
			setResultList(data.myAnnouncements?.list);
		},
		onError: (error) => {
			console.error("GET_MY_ANNOUNCEMENTS", error.graphQLErrors);
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (token: string, current: number = 0) => {
		let skip = 0;
		if (current > 0) skip = current * take;

		setResultList([]);

		if (called) {
			refetch({ take, skip });
		} else {
			search({
				variables: { take, skip },
				context: {
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			});
		}
	};

	return {
		resultList,
		pageInfo,
		loading,
		fetch,
	};
}

export default useGetMyAnnouncements;
