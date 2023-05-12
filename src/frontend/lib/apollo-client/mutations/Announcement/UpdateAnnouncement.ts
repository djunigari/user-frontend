import { gql } from "@apollo/client";

export const UPDATE_ANNOUNCEMENT = gql`
	mutation updateAnnouncement($id: ID!, $url: String, $name: String) {
		updateAnnouncement(id: $id, url: $url, name: $name) {
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
