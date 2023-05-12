import { firestore, functions } from "@frontend/lib/firebase/clientApp";
import IStripePrice, { stripePriceConverter } from "core/model/StripePrice";
import IStripeProduct from "core/model/StripeProduct";
import {
	collection,
	DocumentData,
	getDoc,
	onSnapshot,
	query,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import useAuth from "../data/useAuth";

function useCurrentPackage() {
	const [snapShot, setSnapshot] = useState<QuerySnapshot<DocumentData>>();
	const [subscription, setSubscription] = useState<DocumentData>();
	const [currentPackage, setCurrentPackage] = useState<IStripePrice>();
	const [currentProduct, setCurrentProduct] = useState<IStripeProduct>();
	const { user } = useAuth();

	const fetchCurrentPrice = async () => {
		const priceRef =
			subscription!.price.withConverter(stripePriceConverter);
		const priceDoc = await getDoc<IStripePrice>(priceRef);
		setCurrentPackage(priceDoc.data());
	};

	const fetchCurrentProduct = async () => {
		const productRef = subscription!.product;
		const productDoc = await getDoc<IStripeProduct>(productRef);
		setCurrentProduct(productDoc.data());
	};

	const createStripePortalLink = async () => {
		// Call billing portal function
		const createPortalLink = httpsCallable<
			{ returnUrl: string; locale: string },
			{ url: string }
		>(functions, "ext-firestore-stripe-payments-createPortalLink");

		return createPortalLink({
			returnUrl: window.location.origin,
			locale: "auto",
		}).then((result) => result.data.url);
	};

	useEffect(() => {
		if (!user) return;
		const subscriptionsQuery = query(
			collection(firestore, `customers/${user.uid}/subscriptions`),
			where("status", "in", ["trialing", "active"])
		);
		const unsuscribe = onSnapshot(subscriptionsQuery, async (snapshot) => {
			setSnapshot(snapshot);
		});

		return () => {
			unsuscribe();
		};
	}, [user]);

	useEffect(() => {
		// In this implementation we only expect one Subscription to exist
		if (snapShot?.docs[0]) {
			const subscription = snapShot?.docs[0].data();
			setSubscription(subscription);
		}
	}, [snapShot]);

	useEffect(() => {
		if (!subscription) return;
		fetchCurrentPrice();
		fetchCurrentProduct();
	}, [subscription]);

	return {
		createStripePortalLink,
		currentPackage,
		currentProduct,
	};
}

export default useCurrentPackage;
