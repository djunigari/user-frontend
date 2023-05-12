import { gql } from "@apollo/client";

export const GET_ANNOUNCEMENT = gql`
	query GetAnnouncement($id: ID!) {
		announcement(id: $id) {
			id
			uid
			name
			imageUrl
			url
			announcementInfo {
				totalViews
				totalClicks
			}
		}
	}
`;
