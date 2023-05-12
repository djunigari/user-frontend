import { join } from "path";
import fs from "fs";

const policiesDirectory = join(process.cwd(), "/src/docs/policies");

export async function getPoliciesData(id: string) {
	const fullPath = join(policiesDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	return fileContents;
}
