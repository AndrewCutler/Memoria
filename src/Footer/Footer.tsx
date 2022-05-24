import { Flex, Link } from '@chakra-ui/react';

const Footer = (): React.ReactElement => {
	return (
		<Flex fontSize='sm' justifyContent='center' my={2}>
			Copyright © 2022
			<Link pl={1} isExternal href='https://andrewcutler.info'>
				Andrew Cutler
			</Link>
		</Flex>
	);
};

export default Footer;
