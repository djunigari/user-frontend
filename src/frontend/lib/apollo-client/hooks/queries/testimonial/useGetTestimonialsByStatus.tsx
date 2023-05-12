import { useLazyQuery } from "@apollo/client";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import { IPageInfo } from "@core/model/PageInfo";
import { ITestimonial } from "@core/model/Testimonial";
import { GET_TESTIMONIALS_BY_STATUS } from "@frontend/lib/apollo-client/queries/Testimonial/GetTestimonialsByStatus.query";
import { useState } from "react";

interface useGetTestimonialsByStatusProps {
	take?: number;
}

function useGetTestimonialsByStatus({
	take = 10,
}: useGetTestimonialsByStatusProps) {
	const [resultList, setResultList] = useState<ITestimonial[]>([]);
	const [pageInfo, setPageInfo] = useState<IPageInfo>();

	const [search, { called, loading, refetch }] = useLazyQuery<{
		profileTestimonialsByStatus: {
			pageInfo: IPageInfo;
			list: ITestimonial[];
		};
	}>(GET_TESTIMONIALS_BY_STATUS, {
		onCompleted: (data) => {
			setPageInfo(data.profileTestimonialsByStatus?.pageInfo);
			setResultList(data.profileTestimonialsByStatus?.list);
		},
		onError: (error) => {
			console.error("GET_TESTIMONIALS_BY_STATUS", error.graphQLErrors);
		},
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const fetch = (
		token: string,
		current: number,
		status?: TestimonialStatus
	) => {
		let skip = 0;
		if (current > 0) skip = current * take;

		setResultList([]);

		if (called) {
			refetch({ status, take, skip });
		} else {
			search({
				variables: { status, take, skip },
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

export default useGetTestimonialsByStatus;
