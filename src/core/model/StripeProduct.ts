import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import IStripePrice from "./StripePrice";

export default interface IStripeProduct {
	id?: string;
	active: boolean;
	description: string;
	images: string[];
	name: string;
	tax_code: string;
	prices?: IStripePrice[];
}

export const stripeProductConverter = {
	toFirestore: (product: IStripeProduct) => {
		return {
			active: product.active,
			description: product.description,
			images: product.images,
			name: product.name,
			tax_code: product.tax_code,
		};
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	) => {
		const data = snapshot.data(options);
		const product: IStripeProduct = {
			id: snapshot.id,
			active: data.active,
			description: data.description || "",
			images: data.images || [],
			name: data.name,
			tax_code: data.tax_code,
		};
		return product;
	},
};
