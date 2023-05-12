import React from "react";

const formatValue = (unit_amount: number, currency: string) => {
	return new Intl.NumberFormat("ja-JP", {
		style: "currency",
		currency,
	}).format(unit_amount);
};

export default formatValue;
