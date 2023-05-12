import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export default interface IStripePrice {
	id?: string;
	active: boolean;
	billing_scheme: string;
	currency: string;
	description: string;
	interval: string;
	interval_count: number;
	product: string;
	recurring: IStripePriceRecurring;
	tax_behavior: string;
	type: string;
	unit_amount: number;
}

export interface IStripePriceRecurring {
	interval: string;
	interval_count: number;
	trial_period_days: number;
	usage_type: string;
}

export const stripePriceConverter = {
	toFirestore: (price: IStripePrice) => {
		return {
			active: price.active,
			billing_scheme: price.billing_scheme,
			currency: price.currency,
			description: price.description,
			interval: price.interval,
			interval_count: price.interval_count,
			product: price.product,
			recurring: price.recurring,
			tax_behavior: price.tax_behavior,
			type: price.type,
			unit_amount: price.unit_amount,
		};
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	) => {
		const data = snapshot.data(options);
		const product: IStripePrice = {
			id: snapshot.id,
			active: data.active,
			billing_scheme: data.billing_scheme,
			currency: data.currency,
			description: data.description,
			interval: data.interval,
			interval_count: data.interval_count,
			product: data.product,
			recurring: data.recurring,
			tax_behavior: data.tax_behavior,
			type: data.type,
			unit_amount: data.unit_amount,
		};
		return product;
	},
};
