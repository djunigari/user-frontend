import {
	Button,
	Flex,
	Image as ChakraImage,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { ISelectedFile } from "@frontend/atoms/selectedFileAtom";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface SelectImageProps {
	selectedFile?: ISelectedFile;
	setSelectedFile: (selectedFile?: ISelectedFile) => void;
}

function SelectImage({ selectedFile, setSelectedFile }: SelectImageProps) {
	const toast = useToast();
	const selectedImageRef = useRef<HTMLInputElement>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 50000) {
			toast({
				title: "A imagem é muito pesada!",
				description: "Escolha uma imagem com menos de 50KB.",
				status: "warning",
				duration: 10000,
				isClosable: true,
				position: "top",
			});
			setSelectedFile(undefined);
			return;
		}

		const reader = new FileReader();

		reader.onload = (event: ProgressEvent<FileReader>) => {
			const img = new Image();
			img.onload = () => {
				const maxWidth = 300;
				const maxHeight = 100;

				const isImageWidthOk = img.naturalWidth === maxWidth;
				const isImageHeightOk = img.naturalHeight === maxHeight;

				if (!isImageWidthOk || !isImageHeightOk) {
					toast({
						title: "A imagem é muito grande!",
						description: `Escolha uma imagem com ${maxWidth}px de largura e ${maxHeight}px de altura.`,
						status: "warning",
						duration: 10000,
						isClosable: true,
						position: "top",
					});
					setSelectedFile(undefined);
				} else {
					setSelectedFile({
						file,
						src: (event.target as FileReader).result as string,
						type: "image",
						name: uuidv4(),
					});
				}
			};
			img.src = (event.target as FileReader).result as string;
		};

		reader.readAsDataURL(file);
	};

	return (
		<VStack>
			<input
				hidden
				ref={selectedImageRef}
				type="file"
				accept="image/*"
				onChange={handleChange}
			/>

			{selectedFile?.file ? (
				<ChakraImage src={selectedFile.src} />
			) : (
				<Flex
					align="center"
					justify="center"
					width="300px"
					height="100px"
					border="1px solid"
					borderColor="gray.300"
					bg="gray.50"
				>
					<Text fontWeight="bold">{`300px por 100px`}</Text>
				</Flex>
			)}
			<Flex>
				<Button
					colorScheme="purple"
					onClick={() => selectedImageRef.current?.click()}
				>
					Adicionar nova imagem
				</Button>
			</Flex>
		</VStack>
	);
}

export default SelectImage;
