import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { darkModeAlternateGray, lightModeAlternateGray } from '../App.utility';
import Email from '../Email/Email';
import { About, Support, Tips } from './Informational.helper';

const sections: React.ReactElement[] = [
	<About />,
	<Tips />,
	<Email />,
	<Support />
];

const Informational = (): React.ReactElement => {
	const alternateColor = useColorModeValue(
		lightModeAlternateGray,
		darkModeAlternateGray
	);

	return (
		<Flex
			flexDirection='column'
			fontSize='sm'
			w='100vw'
			borderTop={`1px solid ${alternateColor}`}
		>
			{sections.map((section, index) => (
				<Box
					mt={5}
					key={index}
					py={10}
					px={1}
					background={index % 2 ? 'inherit' : alternateColor}
				>
					{section}
				</Box>
			))}
		</Flex>
	);
};

export default Informational;
