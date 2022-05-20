import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';

const TITLE_HEIGHT = 66;
export const TITLE_HEIGHT_ADJUSTED = TITLE_HEIGHT + 8 + 12; // plus padding and margin

const Title = () => {
	return (
		<Flex
			width='100%'
			justifyContent='space-between'
			px={2}
			h={TITLE_HEIGHT}
		>
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
