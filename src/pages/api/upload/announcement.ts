import { createFolderIfNotExists } from "@backend/lib/aws/createFolderIfNotExists";
import { runMiddleware } from "@backend/lib/aws/runMiddleware";
import { s3Client } from "@backend/lib/aws/s3Client";
import { uploadImage } from "@backend/lib/aws/uploadImage";
import { auth } from "@backend/lib/firebase/firebaseAdminClient";
import multer from "multer";
import multerS3 from "multer-s3";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParser: false,
	},
};
const ALLOWED_FORMATS = ["image/jpeg", "image/jpg"];

export default async function handler(
	req: NextApiRequest & { [key: string]: any },
	res: NextApiResponse
) {
	try {
		const { uid } = await auth.verifyIdToken(req.headers.token as string);
		if (!uid) res.status(401).json({ error: "Authorized" });
		const path = `announcement/${uid}`;
		await createFolderIfNotExists(path);
		const upload = uploadImage(path, ALLOWED_FORMATS);
		await runMiddleware(req, res, upload);
		res.status(201).json({ data: { url: req.file?.location } });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
