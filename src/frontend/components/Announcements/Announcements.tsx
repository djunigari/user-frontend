import {
	Flex,
	Grid,
	GridItem,
	Spacer,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import IUser from "@core/model/User";
import usePaginator from "@frontend/hooks/utils/usePaginator";
import useGetMyAnnouncements from "@frontend/lib/apollo-client/hooks/queries/announcement/useGetAnnouncements";
import { useEffect } from "react";
import Paginator from "../Layout/Paginator/Paginator";
import AnnouncementItem from "./AnnouncementItem";

interface AnnouncementsProps {
	user: IUser;
}

function Announcements({ user }: AnnouncementsProps) {
	const take = 6;
	const { resultList, pageInfo, loading, fetch } = useGetMyAnnouncements({
		take,
	});

	const { pagesQuantity, currentPage, setCurrentPage, setTotal } =
		usePaginator({ take });

	useEffect(() => {
		fetch(user.token);
		setCurrentPage(1);
	}, []);

	useEffect(() => {
		fetch(user.token, currentPage - 1);
	}, [currentPage]);

	useEffect(() => {
		if (pageInfo) setTotal(pageInfo.totalCount || 0);
	}, [pageInfo]);

	return (
		<Flex direction="column" w="full" p={2}>
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

			<Grid
				w="full"
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(3, 1fr)",
				}}
				mt={2}
				gap={4}
			>
				{loading ? (
					<Spinner />
				) : resultList?.length > 0 ? (
					resultList?.map((item, index) => (
						<GridItem key={index}>
							<AnnouncementItem key={index} announcement={item} />
						</GridItem>
					))
				) : (
					<Text>Nenhum Resultado encontrado</Text>
				)}
			</Grid>
		</Flex>
	);
}

export default Announcements;
