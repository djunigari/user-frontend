import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import IUserProfile from "@core/model/UserProfile";
import { UPDATE_PROFILE } from "@frontend/lib/apollo-client/mutations/Profile/UpdateProfile.mutation";

interface useUpdateProfileProps {
	callbackSuccess?: (value: IUserProfile) => void;
	callbackFail?: () => void;
}

function useUpdateProfile({
	callbackSuccess,
	callbackFail,
}: useUpdateProfileProps) {
	const toast = useToast();

	const [updateProfile, { loading }] = useMutation<{
		saveProfileFromUser: IUserProfile;
	}>(UPDATE_PROFILE, {
		onCompleted: (data) => {
			toast({
				title: "Perfil atualizado com sucesso!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess(data.saveProfileFromUser);
		},
		onError: (error) => {
			console.error("UPDATE_PROFILE", error.graphQLErrors);
			toast({
				title: `Erro ao atualizar perfil`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const update = async (token: string, profile?: IUserProfile) => {
		updateProfile({
			variables: {
				profileData: {
					displayName: profile?.displayName,
					imageUrl: profile?.imageUrl,
					telephone: profile?.telephone,
					email: profile?.email,
					whatsapp: profile?.whatsapp,
					facebook: profile?.facebook,
					instagram: profile?.instagram,
					webSite: profile?.webSite,
					youtube: profile?.youtube,
					attendances: profile?.attendances,
					category: profile?.category,
					subCategory: profile?.subCategory,
					services: profile?.services,
					description: profile?.description,
					country: profile?.address?.country,
					postCode: profile?.address?.postCode,
					prefCode: profile?.address?.prefCode,
					cityCode: profile?.address?.cityCode,
					address1: profile?.address?.address1,
					address2: profile?.address?.address2,
				},
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		});
	};
	return { update, loading };
}

export default useUpdateProfile;
