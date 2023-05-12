import { Input, VStack } from "@chakra-ui/react";
import Region from "@frontend/components/CustomSelects/Region/Region";
import React from "react";

interface AddressProps {
	country?: string;
	postCode?: string;
	prefCode?: string;
	cityCode?: string;
	address1?: string;
	address2?: string;
	setAddressProps: (name: string, value: any) => void;
}

function Address({
	country,
	postCode,
	prefCode,
	cityCode,
	address1,
	address2,
	setAddressProps,
}: AddressProps) {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddressProps(event.target.name, event.target.value);
	};

	return (
		<VStack>
			{/* <Input
				name="country"
				value={country || ""}
				type="text"
				placeholder="País"
				onChange={onChange}
			/> */}
			<Input
				name="postCode"
				value={postCode || ""}
				type="text"
				placeholder="Código Postal"
				onChange={onChange}
			/>
			<Region
				prefectureCode={prefCode}
				cityCode={cityCode}
				setPrefectureCode={(value?: string) =>
					setAddressProps("prefCode", value)
				}
				setCityCode={(value?: string) =>
					setAddressProps("cityCode", value)
				}
			/>
			<Input
				name="address1"
				value={address1 || ""}
				type="text"
				placeholder="Linha 1 do endereço "
				onChange={onChange}
			/>
			<Input
				name="address2"
				value={address2 || ""}
				type="text"
				placeholder="Linha 2 do endereço "
				onChange={onChange}
			/>
		</VStack>
	);
}

export default Address;
