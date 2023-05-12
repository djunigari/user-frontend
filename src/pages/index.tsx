import { Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import useAuth from "@frontend/hooks/data/useAuth";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();
	return (
		<>
			<Head>
				<title>Catalogo Japão</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex direction="column" w="full" h="full" align="center">
				{user && (
					<>
						<Text alignSelf="start" mb={2} fontWeight="semibold">
							{`${
								user.displayName || user.email
							}, Seja Bem vindo!`}
						</Text>
					</>
				)}
				<Text borderRadius="md" p={2} bg="white" shadow="md" mb={2}>
					Bem-vindo(a) ao nosso catálogo online! Se você é um(a)
					profissional, freelancer ou empresário(a) que busca expandir
					sua rede de clientes e fazer negócios na comunidade
					brasileira no Japão, você está no lugar certo. Com nosso
					catálogo, você pode criar um perfil para divulgar seus
					serviços e facilitar o contato com clientes em potencial.
					Agradecemos por se juntar a nós e estamos ansiosos para
					ajudá-lo(a) a alcançar seus objetivos de negócios.
				</Text>

				{!user && (
					<VStack
						w="full"
						borderRadius="md"
						bg="white"
						shadow="md"
						p={2}
						mb={2}
					>
						<Text fontWeight="semibold" fontSize="2xl">
							Login/Cadastro
						</Text>
						<Link
							w="full"
							href="https://catalogo.jp/a/signin"
							_hover={{ textDecoration: "none" }}
							isExternal
						>
							<Flex
								cursor="pointer"
								direction="column"
								w="full"
								p={4}
								borderRadius="sm"
								border="1px solid"
								borderColor="blue.50"
								shadow="md"
								_hover={{
									borderColor: "blue.100",
									bg: "gray.50",
								}}
								_active={{
									borderColor: "blue.100",
								}}
							>
								<Flex>
									<Icon
										as={MdOutlinePersonSearch}
										boxSize={10}
										borderRadius="full"
										bg="blue.50"
										color="blue.700"
										p={2}
									/>
									<Text
										color="blue.700"
										fontSize="xs"
										fontWeight="semibold"
									>
										(Cliente)
									</Text>
								</Flex>

								<Text
									mt={2}
									color="blue.300"
									fontWeight="semibold"
								>
									Estou buscando profissionais e empresas.
								</Text>
							</Flex>
						</Link>
						<Flex
							onClick={() => {
								router.push("/a/signin");
							}}
							cursor="pointer"
							direction="column"
							w="full"
							p={4}
							borderRadius="sm"
							border="1px solid"
							borderColor="blue.50"
							shadow="md"
							_hover={{
								borderColor: "blue.100",
								bg: "gray.50",
							}}
							_active={{
								borderColor: "blue.100",
							}}
						>
							<Flex>
								<Icon
									as={IoStorefrontOutline}
									boxSize={10}
									borderRadius="full"
									bg="blue.50"
									color="blue.700"
									p={2}
								/>
								<Text
									color="blue.700"
									fontSize="xs"
									fontWeight="semibold"
								>
									(Profissional/Empresa)
								</Text>
							</Flex>
							<Text mt={2} color="blue.300" fontWeight="semibold">
								Quero adicionar meus contatos e serviços que
								ofereço.
							</Text>
						</Flex>
					</VStack>
				)}
				<Text
					fontWeight="semibold"
					fontSize="sm"
					borderRadius="md"
					p={2}
					bg="red.100"
					shadow="md"
				>
					Por favor, observe que nosso site de catálogo está
					atualmente em versão beta/teste. Isso significa que ainda
					estamos trabalhando para aprimorar nossos recursos e
					funcionalidades. Estamos comprometidos em fornecer a você a
					melhor experiência possível e continuaremos a melhorar o
					site com base em suas sugestões e comentários.
				</Text>
			</Flex>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 1 * 60 * 60, // In seconds
	};
};
