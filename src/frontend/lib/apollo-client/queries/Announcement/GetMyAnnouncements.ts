import { gql } from "@apollo/client";

export const GET_MY_ANNOUNCEMENTS = gql`
	query GetMyAnnouncements($take: Float, $skip: Float) {
		myAnnouncements(take: $take, skip: $skip) {
			pageInfo {
				totalCount
				startCursor
				endCursor
				take
				skip
				hasNextPage
				hasPreviousPage
			}
			list {
				id
				uid
				name
				imageUrl
				url
				createdAt
				announcementInfo {
					totalViews
					totalClicks
				}
			}
		}
	}
`;
