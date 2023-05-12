import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import useCreatePhoneNumberVerification from "@frontend/hooks/profile/useCreatePhoneNumberVerification";
import useVerifyPhoneCode from "@frontend/hooks/profile/useVerifyPhoneCode";
import { auth } from "@frontend/lib/firebase/clientApp";
import { RecaptchaVerifier } from "firebase/auth";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { useIMask } from "react-imask";

interface VerifyPhoneNumberProps {
	title: string;
}

function VerifyPhoneNumber({ title }: VerifyPhoneNumberProps) {
	const router = useRouter();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [code, setCode] = useState("");
	const [expandForm, setExpandForm] = useState(false);
	const [loadingSendCode, setLoadingSendCode] = useState(false);
	const recaptchaWrapperRef = useRef<HTMLDivElement>(null);

	const { createPhoneCodeVerification, loading, sessionInfo } =
		useCreatePhoneNumberVerification({
			callbackSuccess: () => {
				setExpandForm(true);
				setLoadingSendCode(false);
				window.recaptchaVerifier?.clear();
			},
			callbackFail: () => {
				setExpandForm(false);
				setLoadingSendCode(false);
				window.recaptchaVerifier?.clear();
			},
		});

	const { verifyPhoneCode } = useVerifyPhoneCode({
		callbackSuccess: () => {
			router.reload();
			setExpandForm(false);
		},
		callbackFail: () => {
			setExpandForm(false);
		},
	});

	const { ref } = useIMask(
		{
			mask: "+00 (000) 0000-0000",
		},
		{
			onAccept: (value) => setPhoneNumber(value),
		}
	);

	const sendCode = async () => {
		setLoadingSendCode(true);

		recaptchaWrapperRef.current?.removeChild(
			recaptchaWrapperRef.current.children[0]
		);

		const recaptchaWrapper = document.createElement("div");
		recaptchaWrapper.id = "recaptcha-container";
		recaptchaWrapperRef.current?.appendChild(recaptchaWrapper);

		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{ size: "invisible" },
			auth
		);
		const token = await window.recaptchaVerifier.verify();

		createPhoneCodeVerification(ref.current?.value as string, token);
	};

	return (
		<Flex
			direction="column"
			maxW="720px"
			alignSelf="center"
			bg="white"
			p={2}
			borderRadius="md"
			shadow="md"
		>
			<Text fontWeight="bold" fontSize="2xl" mb={2}>
				{title}
			</Text>
			<Input name="phoneNumber" ref={ref} mb={2} disabled={expandForm} />
			{expandForm ? (
				<>
					<Text fontWeight="semibold">Código</Text>
					<Input
						name="code"
						value={code || ""}
						onChange={(e) => setCode(e.target.value)}
						mb={2}
					/>

					<Button
						onClick={() =>
							verifyPhoneCode(sessionInfo, phoneNumber, code)
						}
						isLoading={loadingSendCode}
						variant="solid"
						colorScheme="purple"
					>
						Verificar código
					</Button>
				</>
			) : (
				<>
					<div ref={recaptchaWrapperRef}>
						<div id="recaptcha-container"></div>
					</div>

					<Button
						isLoading={loadingSendCode}
						variant="solid"
						colorScheme="purple"
						onClick={sendCode}
					>
						Enviar código de verificação
					</Button>
				</>
			)}

			<Flex borderRadius="md" bg="blue.100" p={2} mt={2}>
				<Icon alignSelf="center" mr={2} as={FiPhone} fontSize="2xl" />
				<Flex direction="column" flexGrow={1}>
					<Text fontWeight="semibold" mb={2} fontSize="md">
						POR QUE PEDIMOS SEU TELEFONE?
					</Text>
					<Text mb={1} fontSize="sm">
						Pedimos o número do celular como medida de segurança
						para evitar a criação de perfis falsos por usuários
						mal-intencionados.
					</Text>
					<Text fontSize="sm">
						Caso você encontre um perfil com seus dados, por favor,
						avise nossa equipe imediatamente para que possamos
						analisá-lo e deletá-lo caso seja falso, garantindo assim
						a segurança e privacidade de nossos usuários.
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default VerifyPhoneNumber;
