import { atom } from "recoil";

export interface ISelectedFile {
	type: "image";
	file: File;
	src?: string;
	name?: string;
}

interface NewProfileImageSelectedState {
	newProfileImageSelected?: ISelectedFile;
}

const defaultState: NewProfileImageSelectedState = {};

export const newProfileImageSelectedState = atom<NewProfileImageSelectedState>({
	key: "newProfileImageSelectedState",
	default: defaultState,
});
