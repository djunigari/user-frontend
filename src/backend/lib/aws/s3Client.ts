import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
	endpoint: process.env.SPACES_ENDPOINT,
	region: "SGP1",
	credentials: {
		accessKeyId: process.env.SPACES_KEY as string,
		secretAccessKey: process.env.SPACES_SECRET as string,
	},
});

export { s3Client };
