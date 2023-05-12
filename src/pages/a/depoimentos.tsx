import { Flex, Text } from "@chakra-ui/react";
import { TypeProfile } from "@core/enums/TypeProfile.enum";
import Testimonials from "@frontend/components/Testimonials/Testimonials";
import useAuth from "@frontend/hooks/data/useAuth";

function TestimonialPage() {
	const { user } = useAuth();

	if (!user || user.plan === TypeProfile.FREE)
		return (
			<Flex w="full" h="full" maxW="720px">
				<Text>Acesso negado!</Text>
			</Flex>
		);

	return (
		<Flex
			direction="column"
			w="full"
			h="full"
			align="center"
			justify="center"
		>
			<Testimonials user={user} />
		</Flex>
	);
}

export default TestimonialPage;
