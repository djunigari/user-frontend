import { ProfileAddress } from "@core/model/ProfileAddress";
import Address from "../Address";
import Item from "./Item";

interface AddressTabProps {
	isLoading: boolean;
	save: () => void;
	cancel: () => void;
	address?: ProfileAddress;
	setAddressProps: (name: string, value: any) => void;
}

function AddressTab({
	isLoading,
	cancel,
	save,
	address,
	setAddressProps,
}: AddressTabProps) {
	return (
		<Item
			title="Endereço"
			isLoading={isLoading}
			cancel={cancel}
			save={save}
		>
			<Address
				country={address?.country}
				postCode={address?.postCode}
				prefCode={address?.prefCode}
				cityCode={address?.cityCode}
				address1={address?.address1}
				address2={address?.address2}
				setAddressProps={setAddressProps}
			/>
		</Item>
	);
}

export default AddressTab;
