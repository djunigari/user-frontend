import { Flex, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import IUser from "@core/model/User";
import usePaginator from "@frontend/hooks/utils/usePaginator";
import useGetTestimonialsByStatus from "@frontend/lib/apollo-client/hooks/queries/testimonial/useGetTestimonialsByStatus";
import { useEffect, useState } from "react";
import Paginator from "../Layout/Paginator/Paginator";
import TestimonialItem from "./TestimonialItem";
import TestimonialsStatusFilter from "./TestimonialsStatusFilter";

interface TestimonialsProps {
	user: IUser;
}

function Testimonials({ user }: TestimonialsProps) {
	const take = 5;
	const { resultList, pageInfo, loading, fetch } = useGetTestimonialsByStatus(
		{ take }
	);
	const [status, setStatus] = useState<TestimonialStatus>();

	const { pagesQuantity, currentPage, setCurrentPage, setTotal } =
		usePaginator({ take });

	useEffect(() => {
		fetch(user.token, 0, status);
		setCurrentPage(1);
	}, [status]);

	useEffect(() => {
		fetch(user.token, currentPage - 1, status);
	}, [currentPage]);

	useEffect(() => {
		if (pageInfo) setTotal(pageInfo.totalCount || 0);
	}, [pageInfo]);

	return (
		<Flex direction="column" w="full" maxW="720px" p={2}>
			<TestimonialsStatusFilter
				status={status}
				setStatus={setStatus}
				mb={2}
			/>
			<Flex
				w="full"
				direction={{ base: "column-reverse", md: "row" }}
				mb={2}
			>
				<Text
					fontSize="xs"
					fontWeight="semibold"
					borderRadius="md"
					p={1}
					bg="white"
					alignSelf="start"
					w="auto"
				>
					Total encontrado: ({pageInfo?.totalCount || 0})
				</Text>
				<Spacer />
				<Paginator
					pagesQuantity={pagesQuantity}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					mb={2}
					alignSelf="end"
				/>
			</Flex>

			<VStack w="full">
				{loading ? (
					<Spinner />
				) : resultList?.length > 0 ? (
					resultList?.map((item, index) => (
						<TestimonialItem key={index} testimonial={item} />
					))
				) : (
					<Text>Nenhum Resultado encontrado</Text>
				)}
			</VStack>
		</Flex>
	);
}

export default Testimonials;
