import {
	ISelectedFile,
	newProfileImageSelectedState,
} from "@frontend/atoms/selectedFileAtom";
import { useRecoilState } from "recoil";

function useNewProfileImageSelectedState() {
	const [stateValue, setStateValue] = useRecoilState(
		newProfileImageSelectedState
	);

	const setNewProfileImageSelected = (
		newProfileImageSelected?: ISelectedFile
	) => {
		setStateValue((prev) => ({
			...prev,
			newProfileImageSelected,
		}));
	};

	return {
		newProfileImageSelected: stateValue.newProfileImageSelected,
		setNewProfileImageSelected,
	};
}

export default useNewProfileImageSelectedState;
