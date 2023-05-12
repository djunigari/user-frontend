import { Flex, Text } from "@chakra-ui/react";
import { TestimonialStatus } from "@core/enums/TestimonialStatus.enum";
import SelectSearch, {
	ISelectOption,
} from "@frontend/components/CustomSelects/SelectSearch";
import { useEffect, useState } from "react";

interface SelectStatusProps {
	option?: ISelectOption;
	setOption: (option?: ISelectOption) => void;
}

function SelectStatus({ option, setOption }: SelectStatusProps) {
	const [options, setOptions] = useState<ISelectOption[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const options = [
			{
				label: "Todos",
				value: "",
			},
			{
				label: "Aprovado",
				value: TestimonialStatus.APPROVED,
			},
			{
				label: "Em Espera",
				value: TestimonialStatus.WAITING,
			},
			{
				label: "Reprovado",
				value: TestimonialStatus.REPROVED,
			},
		];

		setOptions(options);
		setLoading(false);
	}, []);

	return (
		<Flex width="full" align="center">
			<Text fontSize="sm" fontWeight="bold" mr={2}>
				Filtrar:
			</Text>
			<SelectSearch
				name="status"
				selectedOption={
					option
						? options.find((o) => o.value === option.value)
						: undefined
				}
				setSelectedOption={setOption}
				options={options}
				loading={loading}
			/>
		</Flex>
	);
}

export default SelectStatus;
