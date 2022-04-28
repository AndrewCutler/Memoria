import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Title = () => {
	return (
		<Flex width='100%' justifyContent='space-between' px={2}>
			<Box minHeight='42px'>
				<Heading>Memoria</Heading>
				<Text fontSize='sm' color='gray.400'>
					A text memorization tool
				</Text>
			</Box>
			<ColorModeSwitcher />
		</Flex>
	);
};

export default Title;
