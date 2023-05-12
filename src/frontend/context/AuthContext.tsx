import IUser, { parseUserFirebaseToUser } from "@core/model/User";
import { auth } from "@frontend/lib/firebase/clientApp";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import Router from "next/router";
import nookies from "nookies";
import { createContext, useEffect, useState } from "react";

interface Props {
	children?: any;
}

interface AuthContextProps {
	user?: IUser | null;
	loading?: boolean;
	signIn?: () => Promise<void>;
	logout?: () => Promise<void>;
	setLoading?: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({});

export function AuthProvider({ children }: Props) {
	const provider = new GoogleAuthProvider().setCustomParameters({
		prompt: "select_account",
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	const signIn = async () => {
		window.sessionStorage.setItem("pending", "1");
		await signInWithRedirect(auth, provider);
	};

	const logout = async () => {
		await signOut(auth);
		nookies.set(null, "token-cat-jp", "", { path: "/" });
		setUser(null);
		window.location.reload();
		Router.push("/");
	};

	// listen for token changes
	// call setUser and write new token as a cookie
	useEffect(() => {
		const unsub = auth.onIdTokenChanged(async (userFirebase) => {
			if (!userFirebase) {
				nookies.set(null, "token-cat-jp", "", { path: "/" });
				setUser(null);
			} else {
				const token = await userFirebase.getIdToken();
				nookies.set(undefined, "token-cat-jp", token, { path: "/" });
				setLoading(false);
				const user = await parseUserFirebaseToUser(userFirebase);
				setUser(user);
			}
		});
		return () => unsub && unsub();
	}, []);

	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			const user = auth.currentUser;
			if (user) {
				try {
					await user.getIdToken(true);
				} catch (error) {
					// refresh the page if the session is expired
					window.location.reload();
				}
			}
		}, 10 * 60 * 1000);

		return () => clearInterval(handle);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signIn,
				logout,
				setLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
