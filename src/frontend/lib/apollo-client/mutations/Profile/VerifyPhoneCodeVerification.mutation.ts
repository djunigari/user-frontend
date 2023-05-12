import { gql } from "@apollo/client";

export const VERIFY_PHONE_CODE_VERIFICATION = gql`
	mutation verifyPhoneCodeVerification(
		$sessionInfo: String!
		$phoneNumber: String!
		$code: String!
	) {
		verifyPhoneCodeVerification(
			sessionInfo: $sessionInfo
			phoneNumber: $phoneNumber
			code: $code
		)
	}
`;
