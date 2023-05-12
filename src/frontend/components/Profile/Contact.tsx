import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";
import React from "react";
import { useIMask } from "react-imask";

interface ContactProps {
	email?: string;
	telephone?: string;
	whatsapp?: string;
	facebook?: string;
	instagram?: string;
	webSite?: string;
	youtube?: string;
	setUserProfileProps: (name: string, value: any) => void;
}

function Contact({
	email,
	telephone,
	whatsapp,
	facebook,
	instagram,
	webSite,
	youtube,
	setUserProfileProps,
}: ContactProps) {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserProfileProps(event.target.name, event.target.value);
	};
	const { ref } = useIMask(
		{
			mask: "+00 (000) 0000-0000",
		},
		{
			onAccept: (value) => setUserProfileProps("whatsapp", value),
		}
	);

	return (
		<>
			<FormControl isRequired>
				<FormLabel>Email de contato</FormLabel>
				<Input
					name="email"
					value={email || ""}
					type="email"
					onChange={onChange}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Telefone</FormLabel>
				<Input
					name="telephone"
					ref={ref}
					defaultValue={telephone || ""}
					onChange={onChange}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>WhatsApp</FormLabel>
				<Input
					name="whatsapp"
					ref={ref}
					defaultValue={whatsapp || ""}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Facebook</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="facebook.com/" />
					<Input
						name="facebook"
						value={facebook || ""}
						placeholder="nome do meu perfil"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Instagram</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="instagram.com/" />
					<Input
						name="instagram"
						value={instagram || ""}
						placeholder="nome do meu perfil sem @"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Youtube</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="youtube.com/@" />
					<Input
						name="youtube"
						value={youtube || ""}
						placeholder="nome do seu canal sem @"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>WebSite</FormLabel>
				<InputGroup size="sm">
					<InputLeftAddon children="https://" />
					<Input
						name="webSite"
						value={webSite || ""}
						placeholder="mysite"
						onChange={onChange}
					/>
				</InputGroup>
			</FormControl>
		</>
	);
}

export default Contact;
