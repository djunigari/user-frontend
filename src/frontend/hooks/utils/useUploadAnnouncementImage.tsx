import { useToast } from "@chakra-ui/react";
import { ISelectedFile } from "@frontend/atoms/selectedFileAtom";
import { useEffect, useState } from "react";
import useAuth from "../data/useAuth";

function useUploadAnnouncementImage() {
	const { user } = useAuth();
	const toast = useToast();
	const [error, setError] = useState("");

	useEffect(() => {
		if (error) {
			toast({
				title: error,
				status: "error",
				isClosable: true,
			});
		}
	}, [error]);

	const onUploadFile = async (
		selectedImage: ISelectedFile,
		callbackSuccess: (value: string) => void
	) => {
		const file = selectedImage?.file;
		if (!file) return;

		try {
			const name = selectedImage.name || user?.uid;
			let formData = new FormData();
			formData.append("media", file, `${name}.jpg`);

			const res = await fetch("/api/upload/announcement", {
				method: "POST",
				body: formData,
				headers: {
					token: user?.token as string,
				},
			});

			const {
				data,
				error,
			}: {
				data?: { url: string };
				error?: string;
			} = await res.json();

			if (error || !data) {
				throw new Error(error);
			}

			// console.log("File was uploaded successfylly:", data);
			callbackSuccess(data.url as string);
		} catch (error) {
			console.error(error);
			setError("Sorry! something went wrong.");
			throw error;
		}
	};

	return {
		onUploadFile,
	};
}

export default useUploadAnnouncementImage;
