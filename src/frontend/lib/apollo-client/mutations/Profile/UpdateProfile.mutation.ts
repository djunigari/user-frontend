import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile($profileData: UpdateProfileDataInput!) {
		saveProfileFromUser(profileData: $profileData) {
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
