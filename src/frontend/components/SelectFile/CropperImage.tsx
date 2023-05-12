import { Box, Flex } from "@chakra-ui/react";
import { ISelectedFile } from "@frontend/atoms/selectedFileAtom";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import MenuCropper from "./MenuCropper";

type tplotOptions = {
	[key: string]: number;
};
export const ORIENTATION_TO_ANGLE: tplotOptions = {
	"3": 180,
	"6": 90,
	"8": -90,
};

interface CropperImageProps {
	selectedFile?: ISelectedFile;
	setSelectedFile: (selectedFile?: ISelectedFile) => void;
	closeModal: () => void;
}

function CropperImage({
	selectedFile,
	setSelectedFile,
	closeModal,
}: CropperImageProps) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
		null
	);

	const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const cancelCroppedImage = () => {
		setSelectedFile(undefined);
		setZoom(1);
		setCrop({ x: 0, y: 0 });
	};

	const createImage = (url: string) =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener("load", () => resolve(image));
			image.addEventListener("error", (error) => reject(error));
			image.setAttribute("crossOrigin", "anonymous");
			image.src = url;
		});

	const getCroppedImg = async (imageSrc: string, crop: Area) => {
		const image = await createImage(imageSrc);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		/* setting canvas width & height allows us to 
			resize from the original image resolution */
		canvas.width = 250;
		canvas.height = 250;

		ctx?.drawImage(
			image as CanvasImageSource,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			canvas.width,
			canvas.height
		);

		return canvas.toDataURL();
	};

	const addImage = async () => {
		const croppedDataUrl = await getCroppedImg(
			selectedFile?.src!,
			croppedAreaPixels!
		);

		if (croppedDataUrl) {
			const blob = await fetch(croppedDataUrl).then((it) => it.blob());
			const file = new File([blob], `croppedImage.jpg`, {
				type: "image/jpg",
			});

			setSelectedFile({
				type: "image",
				file,
				src: croppedDataUrl,
			});
		}
		closeModal();
	};

	return (
		<Flex direction={{ base: "column", md: "row" }}>
			<Box
				position="relative"
				width="100%"
				height={{ base: "250px", sm: "300px" }}
				bg="rgba(51, 51, 51, 0)"
			>
				<Cropper
					cropShape="round"
					image={selectedFile?.src}
					crop={crop}
					zoom={zoom}
					aspect={1}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</Box>
			<MenuCropper
				zoom={zoom}
				setZoom={setZoom}
				addImage={addImage}
				cancelCroppedImage={cancelCroppedImage}
			/>
		</Flex>
	);
}

export default CropperImage;
