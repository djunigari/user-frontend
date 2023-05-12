import { gql } from "@apollo/client";

export const CREATE_PHONE_CODE_VERIFICATION = gql`
	mutation createPhoneCodeVerification(
		$phoneNumber: String!
		$recaptchaToken: String!
	) {
		createPhoneCodeVerification(
			phoneNumber: $phoneNumber
			recaptchaToken: $recaptchaToken
		)
	}
`;
