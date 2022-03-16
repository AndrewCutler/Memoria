import { Box, chakra, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const HiddenTextarea = ({
	text,
	onComplete
}: {
	text: string;
	onComplete: (guesses: boolean[]) => void;
}): React.ReactElement => {
	const divRef = useRef<any>(null);

	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);

	const [index, setIndex] = useState<number>(0);
	const [guesses, setGuesses] = useState<boolean[]>([]);
	const [formattedText, setFormattedText] = useState<string[]>([]);
	const [isComplete, setIsComplete] = useState<boolean>(false);

	const focusDiv = (): void => {
		divRef?.current?.focus();
	};

	const blurDiv = (): void => {
		divRef?.current?.blur();
	};

	const handleKeyPress = (key: string): void => {
		if (!isComplete) {
			const isCorrect =
				key.toLowerCase() === formattedText[index].charAt(0);
			setGuesses((prev) => [...prev, isCorrect]);
			setIndex((prev) => ++prev);
		}
	};

	useEffect(() => {
		if (index && index === formattedText.length) {
			blurDiv();
			setIsComplete(true);
			onComplete(guesses);
		}
	}, [index, formattedText, onComplete, guesses]);

	useEffect(() => {
		focusDiv();
	}, []);

	useEffect(() => {
		setFormattedText(text.split(/\s+/));
	}, [text]);

	return (
		<Box
			onKeyPress={({ key }) => handleKeyPress(key)}
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
			{formattedText.slice(0, index).map((word, index) => {
				const key = `${word}_${index}`;

				return (
					<chakra.span
						color={guesses[index] ? 'green.400' : 'red.400'}
						key={key}
					>
						{word + ' '}
					</chakra.span>
				);
			})}
		</Box>
	);
};

export default HiddenTextarea;
