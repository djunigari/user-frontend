import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { VERIFY_PHONE_CODE_VERIFICATION } from "@frontend/lib/apollo-client/mutations/Profile/VerifyPhoneCodeVerification.mutation";
import useAuth from "../data/useAuth";

interface useVerifyPhoneCodeProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useVerifyPhoneCode({
	callbackSuccess,
	callbackFail,
}: useVerifyPhoneCodeProps) {
	const toast = useToast();
	const { user } = useAuth();

	const [verify, { loading }] = useMutation(VERIFY_PHONE_CODE_VERIFICATION, {
		onCompleted: () => {
			toast({
				title: "Código de verificado!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("VERIFY_PHONE_CODE_VERIFICATION", error);
			toast({
				title: `Erro de verificação`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const verifyPhoneCode = (
		sessionInfo: string,
		phoneNumber: string,
		code: string
	) => {
		verify({
			variables: {
				sessionInfo,
				phoneNumber,
				code,
			},
			context: {
				headers: {
					authorization: `Bearer ${user?.token}`,
				},
			},
		});
	};

	return { verifyPhoneCode, loading };
}

export default useVerifyPhoneCode;
