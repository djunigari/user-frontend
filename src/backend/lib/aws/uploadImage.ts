import { s3Client } from "@backend/lib/aws/s3Client";
import multer from "multer";
import multerS3 from "multer-s3";

export const uploadImage = (path: string, allowedFormats: string[]) =>
	multer({
		storage: multerS3({
			s3: s3Client,
			bucket: process.env.SPACES_BUCKET as string,
			acl: "public-read",
			key: (req, file, cb) => {
				cb(null, `${path}/${file.originalname}`);
			},
		}),
		fileFilter: (req, file, cb) => {
			if (allowedFormats.includes(file.mimetype)) {
				cb(null, true);
			} else {
				return cb(new Error("goes wrong on the mimetype"));
			}
		},
	}).single("media");
