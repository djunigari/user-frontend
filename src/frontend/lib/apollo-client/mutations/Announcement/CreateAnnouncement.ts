import { gql } from "@apollo/client";

export const CREATE_ANNOUNCEMENT = gql`
	mutation createAnnouncement(
		$imageUrl: String!
		$url: String
		$name: String!
	) {
		createAnnouncement(imageUrl: $imageUrl, url: $url, name: $name) {
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
