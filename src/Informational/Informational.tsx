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
		<Flex flexDirection='column' fontSize='sm' w='100vw'>
			{sections.map((section, index) => (
				<Box
					my={2}
					py={2}
					px={1}
					background={index % 2 ? alternateColor : 'inherit'}
				>
					{section}
				</Box>
			))}
		</Flex>
	);
};

export default Informational;
