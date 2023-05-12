import { User } from "firebase/auth";

export default interface IUser {
	uid?: string;
	displayName: string;
	phoneNumber: string;
	email: string;
	imageUrl: string;
	token: string;
	plan?: string;
}

export async function parseUserFirebaseToUser(
	userFirebase: User
): Promise<IUser> {
	const idToken = await userFirebase.getIdToken();
	const idTokenResult = await userFirebase.getIdTokenResult();
	return {
		uid: userFirebase?.uid,
		displayName: userFirebase?.displayName as string,
		phoneNumber: userFirebase.phoneNumber as string,
		email: userFirebase?.email as string,
		imageUrl: userFirebase?.photoURL as string,
		token: idToken,
		plan: idTokenResult.claims.stripeRole,
	};
}
