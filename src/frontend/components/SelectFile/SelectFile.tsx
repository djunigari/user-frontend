import { Button, Flex } from "@chakra-ui/react";
import { ISelectedFile } from "@frontend/atoms/selectedFileAtom";
import { useRef } from "react";
import CropperImage from "./CropperImage";

interface SelectFileProps {
	selectedFile?: ISelectedFile;
	setSelectedFile: (selectedFile?: ISelectedFile) => void;
	closeModal: () => void;
}

function SelectFile({
	selectedFile,
	setSelectedFile,
	closeModal,
}: SelectFileProps) {
	const selectedFileRef = useRef<HTMLInputElement>(null);

	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			let file = e.target.files[0];
			let type = file.type.split("/")[0];
			if (type === "image") {
				await onFileChangeImage(file);
			} else {
				throw new Error("Filex extension not accept");
			}
		}
	};

	const onFileChangeImage = async (file: File) => {
		let blob = new Blob([file]);
		let src = URL.createObjectURL(blob);
		setSelectedFile({
			file,
			src,
			type: "image",
		});
	};

	return (
		<Flex direction="column">
			<Button onClick={() => selectedFileRef.current?.click()} mb={2}>
				Carregar nova foto de perfil
			</Button>
			{selectedFile?.file && (
				<CropperImage
					selectedFile={selectedFile}
					setSelectedFile={setSelectedFile}
					closeModal={closeModal}
				/>
			)}

			<input
				hidden
				ref={selectedFileRef}
				type="file"
				// accept="audio/*, video/*"
				accept="image/*,video/*"
				onChange={onFileChange}
			/>
		</Flex>
	);
}

export default SelectFile;
