import Markdown from "@frontend/components/Layout/Markdown";
import { getPoliciesData } from "@frontend/lib/api/getPoliciesData";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface FacebookDataDeletionInstructionProps {
	contentHtml: string;
}

export default function PolicyPage({
	contentHtml,
}: FacebookDataDeletionInstructionProps) {
	return <Markdown contentHtml={contentHtml} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { policyName } = context.query;
	return {
		props: {
			contentHtml: await getPoliciesData(policyName as string),
		},
	};
};
