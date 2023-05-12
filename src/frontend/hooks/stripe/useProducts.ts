import { auth, firestore } from "@frontend/lib/firebase/clientApp";
import { stripePriceConverter } from "core/model/StripePrice";
import IStripeProduct, {
	stripeProductConverter,
} from "core/model/StripeProduct";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function useProducts() {
	const [user, loading, error] = useAuthState(auth);
	const [products, setProducts] = useState<IStripeProduct[]>([]);

	const fetchStripeProducts = async () => {
		const productsQuery = query(
			collection(firestore, "products"),
			where("active", "==", true)
		).withConverter(stripeProductConverter);

		const productsDocs = await getDocs(productsQuery);
		const products = await Promise.all(
			productsDocs.docs.map(async (doc) => {
				const prices = await fetchStripePrices(doc.data().id!);
				return { ...doc.data(), prices } as IStripeProduct;
			})
		);
		setProducts(products);
	};

	const fetchStripePrices = async (productId: string) => {
		const pricesQuery = query(
			collection(firestore, `products/${productId}/prices`),
			orderBy("unit_amount")
		).withConverter(stripePriceConverter);

		const pricesDocs = await getDocs(pricesQuery);
		return pricesDocs.docs.map((doc) => doc.data());
	};

	useEffect(() => {
		if (!loading && user) fetchStripeProducts();
	}, [user, loading]);

	return {
		products,
	};
}

export default useProducts;
