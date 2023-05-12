import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import { ITestimonial } from "@core/model/Testimonial";
import { CHANGE_TESTIMONIAL_STATUS } from "@frontend/lib/apollo-client/mutations/Testimonial/ChangeTestimonialStatus";

interface useChangeTestimonialStatusProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useChangeTestimonialStatus({
	callbackSuccess,
	callbackFail,
}: useChangeTestimonialStatusProps) {
	const toast = useToast();

	const [updateProfile, { loading }] = useMutation<{
		changeTestimonialStatus: ITestimonial;
	}>(CHANGE_TESTIMONIAL_STATUS, {
		onCompleted: (data) => {
			toast({
				title: "Depoimento atualizado!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			callbackSuccess && callbackSuccess();
		},
		onError: (error) => {
			console.error("CHANGE_TESTIMONIAL_STATUS", error.graphQLErrors);
			toast({
				title: `Erro ao aprovar/reprovar depoimento`,
				status: "error",
				isClosable: true,
			});
			callbackFail && callbackFail();
		},
	});

	const update = async (
		token: string,
		userId: string,
		status: TestimonialStatus.APPROVED | TestimonialStatus.REPROVED
	) => {
		updateProfile({
			variables: {
				userId,
				status,
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

export default useChangeTestimonialStatus;
