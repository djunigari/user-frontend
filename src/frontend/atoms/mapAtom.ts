import { atom } from "recoil";
import { prefList } from "@core/prefectures/Prefectures";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GeoJsonObject } from "geojson";

export interface IprefectureOption {
	label: string;
	value: string;
}

export interface IcityOption {
	label: string;
	value: string;
	prefCode: string;
}

const prefectureOptions = () => {
	const options = prefList.map((pref) => ({
		label: pref.name,
		value: pref.prefCode,
	}));
	options.sort((a, b) => {
		if (a.label < b.label) return -1;
		if (a.label > b.label) return 1;
		return 0;
	});

	return options;
};

interface MapState {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	prefectures: GeoJsonObject[];
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	prefectureSelected?: GeoJsonObject;
	prefectureOptions: IprefectureOption[];
}

const defaultMapState: MapState = {
	prefectures: [],
	prefectureOptions: prefectureOptions(),
};

export const mapState = atom<MapState>({
	key: "mapState",
	default: defaultMapState,
});
