import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { GameState } from './App';

const HiddenTextarea = ({
	gameState,
	onKeyPress,
	children
}: {
	gameState: GameState;
	onKeyPress: (key: string) => void;
	children: any;
}): React.ReactElement => {
	const elRef = useRef<any>(null);
	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);
	const [letters, setLetters] = useState<string[]>([]);

	const focusElement = (): void => {
		elRef?.current?.focus();
	};

	const handleKeyPress = (key: string): void => {
		onKeyPress(key);
		setLetters((prev) => [...prev, key]);
	};

	useEffect(() => {
		if (gameState === 'IN PROGRESS') {
			setLetters([]);
			focusElement();
		}
	}, [gameState]);

	return (
		<>
			<Input
				ref={elRef}
				onKeyPress={({ key }) => handleKeyPress(key)}
				disabled={gameState === 'COMPLETE'}
				mb={3}
				value={letters.join(' ')}
				readOnly
				type='text'
			/>
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
