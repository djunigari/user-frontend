import { ComponentDefaultProps, Flex, ListItem, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

const newTheme = {
	h1: (props: ComponentDefaultProps) => {
		return (
			<Text mt={2} alignSelf="center" fontSize="2xl" fontWeight="bold">
				{props.children}
			</Text>
		);
	},
	h2: (props: ComponentDefaultProps) => {
		const { children } = props;
		return (
			<Text mt={2} ml={2} fontSize="xl" fontWeight="bold">
				{props.children}
			</Text>
		);
	},
	h3: (props: ComponentDefaultProps) => {
		return (
			<Text mt={2} ml={4} fontSize="lg" fontWeight="bold">
				{props.children}
			</Text>
		);
	},
	p: (props: ComponentDefaultProps) => {
		return (
			<Text p={2} ml={6} fontSize="sm">
				{props.children}
			</Text>
		);
	},
	li: (props: ComponentDefaultProps) => {
		return (
			<ListItem ml={8} fontSize="sm">
				{props.children}
			</ListItem>
		);
	},
};

interface MarkdownProps {
	contentHtml: string;
}

function Markdown({ contentHtml }: MarkdownProps) {
	return (
		<Flex w="full" h="full" justify="center">
			<Flex maxW="720px" direction="column" p={4}>
				<ReactMarkdown
					components={ChakraUIRenderer(newTheme)}
					children={contentHtml}
					skipHtml
				/>
			</Flex>
		</Flex>
	);
}

export default Markdown;
