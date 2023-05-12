import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaAsterisk } from "react-icons/fa";

interface ServiceInfoProps {
	services: string[];
	setServices: (value: string[]) => void;
}

function ServiceInfo({ services, setServices }: ServiceInfoProps) {
	const [service, setService] = useState<string>();

	const addService = () => {
		if (!service) return;

		if (!services?.find((s) => s === service.trim())) {
			setServices([...(services || []), service.trim()]);
		}
		setService(undefined);
	};

	const removeService = (service: string) => {
		if (services?.find((s) => s === service)) {
			setServices(services.filter((s) => s !== service));
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setService(e.target.value);
	};

	return (
		<Flex direction="column" w="full">
			<FormControl id="services" zIndex={0}>
				<FormLabel fontWeight="bold">Serviços Oferecidos</FormLabel>
				<InputGroup size="md">
					<InputLeftElement
						pointerEvents="none"
						children={<FaAsterisk color="orange" />}
					/>
					<Input
						name="service"
						value={service || ""}
						onChange={onChange}
						placeholder="Adicionar Serviço"
					/>
					<InputRightElement w="auto">
						<Button
							mr={2}
							fontSize="x-small"
							size="sm"
							bg="orange"
							_hover={{ bg: "orange.200" }}
							onClick={addService}
						>
							Adicionar
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Text fontSize="xs" fontWeight="bold" m={2}>
				Serviços adicionados:
			</Text>
			{services && services.length > 0 ? (
				<Wrap direction="row">
					{services?.map((item, index) => (
						<WrapItem
							key={index}
							p={2}
							borderRadius="md"
							border="1px dashed"
							color="gray.400"
						>
							<Flex align="center">
								<Text
									fontSize="sm"
									fontWeight="semibold"
									color="orange"
								>
									{`* ${item} `}
								</Text>
								<Icon
									ml={1}
									as={BsFillTrashFill}
									fontSize="sm"
									color="red.400"
									cursor="pointer"
									onClick={() => removeService(item)}
								/>
							</Flex>
						</WrapItem>
					))}
				</Wrap>
			) : (
				<Text fontSize="xs" mx={2}>
					Nenhum Serviço adicionado
				</Text>
			)}
		</Flex>
	);
}

export default ServiceInfo;
