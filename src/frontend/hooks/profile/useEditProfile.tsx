import { useToast } from "@chakra-ui/react";
import { ProfileAddress } from "@core/model/ProfileAddress";
import IUserProfile from "@core/model/UserProfile";
import useUpdateProfile from "@frontend/lib/apollo-client/hooks/mutations/profile/useUpdateProfile";
import useGetProfile from "@frontend/lib/apollo-client/hooks/queries/profile/useGetMyProfile";
import { useEffect, useState } from "react";
import useAuth from "../data/useAuth";
import useNewProfileImageSelectedState from "../recoil/useNewProfileImageSelectedState";
import useUpdateImageProfileFile from "../utils/useSelectFile";

interface useEditProfileProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useEditProfile({
	callbackSuccess,
	callbackFail,
}: useEditProfileProps) {
	const toast = useToast();
	const { user } = useAuth();
	const token = user?.token;

	const [profile, setProfile] = useState<IUserProfile>();
	const [newProfile, setNewProfile] = useState<IUserProfile>();
	const [loading, setLoading] = useState<boolean>(false);

	const { fetch, loading: loadingFetch } = useGetProfile({
		callbackSuccess: (profile: IUserProfile) => {
			setProfile(profile);
			setNewProfile(profile);
			callbackSuccess && callbackSuccess();
		},
		callbackFail: callbackFail,
	});

	const { update: updateProfile } = useUpdateProfile({
		callbackSuccess: (profile: IUserProfile) => {
			setProfile(profile);
			setLoading(false);
		},

		callbackFail: () => setLoading(false),
	});

	const { onUploadFile } = useUpdateImageProfileFile();

	const { newProfileImageSelected, setNewProfileImageSelected } =
		useNewProfileImageSelectedState();

	const setProfileProps = (name: string, value: any) => {
		setNewProfile({ ...newProfile, [name]: value });
	};

	const setAddressProps = (name: string, value: string) => {
		const address: ProfileAddress = {
			...newProfile?.address,
			[name]: value,
		};
		setNewProfile({ ...newProfile, address });
	};

	useEffect(() => {
		if (user?.token) fetch(user.token);
	}, [user]);

	const cancel = () => {
		setNewProfile(profile);
		setNewProfileImageSelected(undefined);
	};

	const update = async () => {
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
			const file = newProfileImageSelected?.file;
			if (!file) {
				updateProfile(token, newProfile);
			} else {
				await onUploadFile((value: string) => {
					setProfileProps("imageUrl", value);
					// state not updating before updateProfile, then you need pass the imgUrl here
					updateProfile(token, { ...newProfile, imageUrl: value });
				});
			}
		} catch (error) {
			setLoading(true);
		}
	};

	return {
		profile: newProfile,
		loadingFetch,
		setProfileProps,
		setAddressProps,
		update,
		loading,
		cancel,
	};
}

export default useEditProfile;
