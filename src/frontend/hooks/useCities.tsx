import { Icity, prefList } from "@core/prefectures/Prefectures";
import { IcityOption } from "@frontend/atoms/mapAtom";
import { useEffect, useState } from "react";

function useCities(prefCode: string) {
	const [cities, setCities] = useState<Icity[]>([]);
	const [cityOptions, setCityOptions] = useState<IcityOption[]>([]);

	const getCities = () => {
		const found = prefList.find((pref) => pref.prefCode == prefCode);
		return found?.cities || [];
	};

	const createOptions = (cities: Icity[]) => {
		const options = cities.map(
			(city) =>
				({
					value: city.admAreaCode,
					label: city.nam || city.nam_jp,
					prefCode: city.prefCode,
				} as IcityOption)
		);
		setCityOptions(options);
	};

	useEffect(() => {
		if (prefCode) {
			const list = getCities();
			setCities(list);
			createOptions(list);
		}
	}, [prefCode]);

	return {
		cities,
		cityOptions,
	};
}

export default useCities;
