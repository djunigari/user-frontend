import { useToast } from "@chakra-ui/react";
import IAnnouncement from "@core/model/Announcement";
import { ISelectedFile } from "@frontend/atoms/selectedFileAtom";
import useAddAnnouncement from "@frontend/lib/apollo-client/hooks/mutations/announcement/useAddAnnouncement";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../data/useAuth";
import useUploadAnnouncementImage from "../utils/useUploadAnnouncementImage";

interface useCreateAnnouncementProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useCreateAnnouncement({
	callbackSuccess,
	callbackFail,
}: useCreateAnnouncementProps) {
	const toast = useToast();
	const { user } = useAuth();
	const token = user?.token;
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [selectedImage, setSelectedImage] = useState<ISelectedFile>();

	const { save, loading: saveLoading } = useAddAnnouncement({
		callbackSuccess: () => router.push("/a/anuncios"),
	});

	const { onUploadFile } = useUploadAnnouncementImage();

	const reset = () => {
		setName("");
		setUrl("");
	};

	const create = async () => {
		if (!token) {
			toast({
				title: "Usuário não logado!",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
			return;
		}
		setLoading(true);
		try {
			const file = selectedImage?.file;
			if (file) {
				await onUploadFile(selectedImage, (value: string) => {
					save(user.token, {
						imageUrl: value,
						name,
						url,
					} as IAnnouncement);
				});
			}
		} catch (error: any) {
			toast({
				title: "Ocorreu um erro ao adicionar novo anúncio!",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			console.log(error.message);
		} finally {
			setLoading(true);
		}
	};

	return {
		name,
		url,
		selectedImage,
		setName,
		setUrl,
		setSelectedImage,
		create,
		loading,
		reset,
	};
}

export default useCreateAnnouncement;
