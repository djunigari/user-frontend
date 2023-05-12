import { gql } from "@apollo/client";

export const GET_TESTIMONIALS_BY_STATUS = gql`
	query GetTestimonialsByStatus($status: String, $take: Float, $skip: Float) {
		profileTestimonialsByStatus(status: $status, take: $take, skip: $skip) {
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
				userId
				content
				status
				userName
			}
		}
	}
`;
