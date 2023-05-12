import { gql } from "@apollo/client";

export const REMOVE_ANNOUNCEMENT = gql`
	mutation removeAnnouncement($id: ID!) {
		removeAnnouncement(id: $id)
	}
`;
