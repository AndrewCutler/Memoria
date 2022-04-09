import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const HiddenTextarea = ({
	isComplete,
	onKeyPress,
	children
}: {
	isComplete: boolean;
	onKeyPress: (key: string) => void;
	children: any;
}): React.ReactElement => {
	const divRef = useRef<any>(null);

	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);

	const focusDiv = (): void => {
		divRef?.current?.focus();
	};

	const blurDiv = (): void => {
		divRef?.current?.blur();
	};

	useEffect(() => {
		if (isComplete) {
			blurDiv();
		}
	}, [isComplete]);

	useEffect(() => {
		focusDiv();
	}, []);
	return (
		<Box
			onKeyPress={({ key }) => onKeyPress(key)}
			_focus={{
				border: `1px solid #63b3ed`,
				boxShadow: `0 0 0 1px #63b3ed`
			}}
			ref={divRef}
			tabIndex={0}
			textAlign='start'
			py='8px'
			px='16px'
			minH='80px'
			overflow='auto'
			borderRadius={5}
			fontSize='var(--chakra-fontSizes-md)'
			w='100%'
			style={{
				outline: '2px solid transparent',
				outlineOffset: 2,
				border: `1px solid ${borderColor}`
			}}
		>
			{children}
		</Box>
	);
};

export default HiddenTextarea;
