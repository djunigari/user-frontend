import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../data/useAuth";
import useNewProfileImageSelectedState from "../recoil/useNewProfileImageSelectedState";

function useUpdateImageProfileFile() {
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

	const { newProfileImageSelected, setNewProfileImageSelected } =
		useNewProfileImageSelectedState();

	const onUploadFile = async (callbackSuccess: (value: string) => void) => {
		const file = newProfileImageSelected?.file;

		if (!file) return;

		try {
			let formData = new FormData();
			formData.append("media", file, `${user?.uid}.jpg`);

			const res = await fetch("/api/upload/profile", {
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
			setNewProfileImageSelected(undefined);
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

export default useUpdateImageProfileFile;
