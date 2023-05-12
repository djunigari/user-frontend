import {
	Button,
	Flex,
	HStack,
	Icon,
	Spacer,
	Text,
	Textarea,
	Tooltip,
} from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import { ITestimonial } from "@core/model/Testimonial";
import useAuth from "@frontend/hooks/data/useAuth";
import useChangeTestimonialStatus from "@frontend/lib/apollo-client/hooks/mutations/testimonial/useChangeTestimonialStatus";
import { useRouter } from "next/router";
import { ImBlocked, ImClock2 } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";

interface TestimonialItemProps {
	testimonial: ITestimonial;
}

function TestimonialItem({ testimonial }: TestimonialItemProps) {
	const { user } = useAuth();
	const router = useRouter();
	const { update } = useChangeTestimonialStatus({
		callbackSuccess: () => {
			router.reload();
		},
	});

	const approve = () => {
		if (user?.token)
			update(user.token, testimonial.userId, TestimonialStatus.APPROVED);
	};
	const reprove = () => {
		if (user?.token)
			update(user.token, testimonial.userId, TestimonialStatus.REPROVED);
	};

	let icon = ImClock2;
	let color = "orange";
	let description = "Esperando aprovação";

	if (testimonial.status === TestimonialStatus.APPROVED) {
		icon = IoCheckmarkCircle;
		color = "green";
		description = "Aprovado!";
	} else if (testimonial.status === TestimonialStatus.REPROVED) {
		icon = ImBlocked;
		color = "red";
		description = "Reprovado!";
	}

	return (
		<Flex
			direction="column"
			w="full"
			bg="white"
			rounded={"xl"}
			boxShadow={"lg"}
			p={2}
		>
			<HStack w="full" mb={2}>
				<Icon as={icon} color={color} />
				<Text fontSize="xs" fontWeight="bold" color={color}>
					{description}
				</Text>
				<Spacer />
				<Button
					size="xs"
					colorScheme="green"
					onClick={approve}
					isActive={testimonial.status !== TestimonialStatus.APPROVED}
				>
					Aprovar
				</Button>
				<Button
					size="xs"
					colorScheme="red"
					onClick={reprove}
					isActive={testimonial.status !== TestimonialStatus.REPROVED}
				>
					Reprovar
				</Button>
			</HStack>

			<Textarea
				isReadOnly
				fontSize="sm"
				border="1px dashed"
				bg="gray.100"
				color="gray.600"
				value={testimonial.content}
			/>
			<Text mt={2} fontSize="xs" fontWeight="semibold">
				Por: {testimonial.userName}
			</Text>
		</Flex>
	);
}

export default TestimonialItem;
