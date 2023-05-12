import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
	query GetMyProfile {
		myProfile {
			uid
			displayName
			imageUrl
			email
			telephone
			whatsapp
			facebook
			instagram
			webSite
			youtube
			attendances
			category
			subCategory
			services
			description
			address {
				country
				postCode
				prefCode
				cityCode
				address1
				address2
			}
		}
	}
`;
