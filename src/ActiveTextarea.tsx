import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const HiddenTextarea = ({
	isComplete,
	onKeyPress,
	children
}: {
	isComplete: boolean;
	onKeyPress: (key: string) => void;
	children: any;
}): React.ReactElement => {
	const elRef = useRef<any>(null);
	const [hasFocus, setHasFocus] = useState<boolean>(false);
	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);

	const focusElement = (): void => {
		elRef?.current?.focus();
		setHasFocus(true);
	};

	const blurElement = (): void => {
		elRef?.current?.blur();
		setHasFocus(false);
	};

	useEffect(() => {
		if (isComplete) {
			blurElement();
		}
	}, [isComplete]);

	useEffect(() => {
		focusElement();
	}, []);

	return (
		<Box
			// onKeyPress={({ key }) => onKeyPress(key)}
			// _focus={{
			// 	border: `1px solid #63b3ed`,
			// 	boxShadow: `0 0 0 1px #63b3ed`
			// }}
			// ref={elRef}
			// tabIndex={0}
			textAlign='start'
			py='8px'
			px='16px'
			minH='80px'
			overflow='auto'
			borderRadius={5}
			border={hasFocus ? '1px solid #63b3ed' : 'inherit'}
			boxShadow={hasFocus ? '0 0 0 1px #63b3ed' : 'inherit'}
			fontSize='var(--chakra-fontSizes-md)'
			w='100%'
			style={{
				outline: '2px solid transparent',
				outlineOffset: 2,
				border: `1px solid ${borderColor}`
			}}
		>
			<Input
				onKeyPress={({ key }) => onKeyPress(key)}
				ref={elRef}
				type='text'
				display='none'
			/>
			{children}
		</Box>
	);
};

export default HiddenTextarea;
