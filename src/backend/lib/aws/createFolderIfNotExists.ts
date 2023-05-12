import { s3Client } from "./s3Client";

export async function createFolderIfNotExists(folderName: string) {
	// Verifica se a pasta já existe
	const folderExists = await s3Client
		.headObject({
			Bucket: process.env.SPACES_BUCKET as string,
			Key: `${folderName}/`,
		})
		.then(() => true)
		.catch(() => false);

	// Cria a pasta se ela não existir
	if (!folderExists) {
		await s3Client.putObject({
			Bucket: process.env.SPACES_BUCKET as string,
			Key: `${folderName}/`,
		});
	}
}
