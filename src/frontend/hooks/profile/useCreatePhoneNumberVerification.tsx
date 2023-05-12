import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { CREATE_PHONE_CODE_VERIFICATION } from "@frontend/lib/apollo-client/mutations/Profile/CreatePhoneCodeVerification.mutation";
import { useState } from "react";

interface useCreatePhoneNumberVerificationProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}
function useCreatePhoneNumberVerification({
	callbackSuccess,
	callbackFail,
}: useCreatePhoneNumberVerificationProps) {
	const toast = useToast();
	const [sessionInfo, setSessionInfo] = useState("");

	const [create, { loading }] = useMutation(CREATE_PHONE_CODE_VERIFICATION, {
		onCompleted: (data) => {
			setSessionInfo(data.createPhoneCodeVerification);
			toast({
				title: "Código de verificação enviado!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CREATE_CODE_VERIFY", error.graphQLErrors);
			let title = `Erro ao enviar código de verificação`;
			if (error.message === "Phone number already exist") {
				title = `O número do telefone já está sendo usado, insira um novo número`;
			}
			toast({
				title,
				status: "error",
				isClosable: true,
			});

			callbackFail && callbackFail();
		},
	});

	const createPhoneCodeVerification = async (
		phoneNumber: string,
		recaptchaToken: string
	) => {
		create({
			variables: {
				phoneNumber,
				recaptchaToken,
			},
		});
	};
	return { createPhoneCodeVerification, loading, sessionInfo };
}

export default useCreatePhoneNumberVerification;
