import { Button, Flex, Hide, HStack, StackProps, Text } from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import { useEffect, useState } from "react";
import SelectSearch, { ISelectOption } from "../CustomSelects/SelectSearch";
import SelectStatus from "./SelectStatus";

interface TestimonialsStatusFilterProps extends StackProps {
	status?: TestimonialStatus;
	setStatus: (value?: TestimonialStatus) => void;
}

function TestimonialsStatusFilter({
	status,
	setStatus,
	...restProps
}: TestimonialsStatusFilterProps) {
	const [statusOption, setStatusOption] = useState<ISelectOption>();

	useEffect(() => {
		setStatusOption({ label: "", value: "" });
	}, []);

	useEffect(() => {
		const aux = statusOption?.value;

		if (aux === TestimonialStatus.APPROVED) {
			setStatus(TestimonialStatus.APPROVED);
		} else if (aux === TestimonialStatus.WAITING) {
			setStatus(TestimonialStatus.WAITING);
		} else if (aux === TestimonialStatus.REPROVED) {
			setStatus(TestimonialStatus.REPROVED);
		} else setStatus(undefined);
	}, [statusOption]);

	return (
		<>
			<Hide below="md">
				<HStack
					w="full"
					border="1px dashed"
					borderRadius="md"
					p={2}
					{...restProps}
				>
					<Text fontSize="md" fontWeight="bold">
						Filtrar:
					</Text>
					<Button
						size="xs"
						colorScheme="blue"
						onClick={() => setStatus(undefined)}
					>
						Todos
					</Button>
					<Button
						size="xs"
						colorScheme="green"
						onClick={() => setStatus(TestimonialStatus.APPROVED)}
					>
						Aprovados
					</Button>
					<Button
						size="xs"
						colorScheme="orange"
						onClick={() => setStatus(TestimonialStatus.WAITING)}
					>
						Em espera
					</Button>
					<Button
						size="xs"
						colorScheme="red"
						onClick={() => setStatus(TestimonialStatus.REPROVED)}
					>
						Reprovados
					</Button>
				</HStack>
			</Hide>
			<Hide above="md">
				<Flex
					direction="column"
					width="full"
					border="1px dashed"
					borderRadius="md"
					p={2}
				>
					<SelectStatus
						option={statusOption}
						setOption={setStatusOption}
					/>
				</Flex>
			</Hide>
		</>
	);
}

export default TestimonialsStatusFilter;
