import { gql } from "@apollo/client";

export const CHANGE_TESTIMONIAL_STATUS = gql`
	mutation changeTestimonialStatus($userId: String!, $status: String!) {
		changeTestimonialStatus(userId: $userId, status: $status) {
			userId
			content
			status
			userName
		}
	}
`;
