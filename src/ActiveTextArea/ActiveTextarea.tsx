import { Box, Flex, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, isValidKestroke } from '../App.utility';

const HiddenTextarea = ({
	onKeyPress,
	children
}: {
	onKeyPress: (key: string) => void;
	children: any;
}): React.ReactElement => {
	const {
		value: { gameState }
	} = useContext(AppContext);
	const elRef = useRef<any>(null);
	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);
	const [letters, setLetters] = useState<string[]>([]);

	const focusElement = (): void => {
		elRef?.current?.click();
		elRef?.current?.focus();
	};

	const handleChange = (value: string): void => {
		const last = value.charAt(value.length - 1) ?? '';
		if (isValidKestroke(last)) {
			onKeyPress(last);
			setLetters((prev) => [...prev, last]);
		}
	};

	useEffect(() => {
		if (gameState === 'IN PROGRESS') {
			setLetters([]);
			focusElement();
		}
	}, [gameState]);

	return (
		<>
			<Flex w='100%'>
				<Input
					ref={elRef}
					onChange={({ target: { value } }) => handleChange(value)}
					disabled={gameState === 'COMPLETE'}
					mb={3}
					value={letters.join(' ')}
					type='text'
				/>
			</Flex>
			<Box
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
					outline: `2px solid ${borderColor}`,
					outlineOffset: 2,
					border: `1px solid ${borderColor}`
				}}
			>
				{children}
			</Box>
		</>
	);
};

export default HiddenTextarea;
