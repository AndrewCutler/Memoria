import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

type Outcome = 'CORRECT' | 'INCORRECT';

const HiddenTextarea = ({
	initials,
	text,
	onComplete
}: {
	initials: string[];
	text: string;
	onComplete: () => void;
}): React.ReactElement => {
	const divRef = useRef<any>(null);

	// const [outcomes, setOutcomes] = useState<Outcome[]>([]);
	const [index, setIndex] = useState<number>(0);
	const [guesses, setGuesses] = useState<Map<string, Outcome | undefined>>();
	const [formattedText, setFormattedText] = useState<string[]>([]);

	const focusDiv = (): void => {
		divRef?.current?.focus();
	};

	const handleKeyPress = (key: string): void => {
		const isCorrect = key.toLowerCase() === initials[index];
		// setOutcomes((prev) => [...prev, isCorrect ? 'CORRECT' : 'INCORRECT']);
		setIndex((prev) => ++prev);
		console.log(formattedText[index]);
	};

	useEffect(() => {
		if (index === initials.length) {
			onComplete();
		}
	}, [index, initials, onComplete]);

	useEffect(() => {
		focusDiv();
	}, []);

	useEffect(() => {
		//  TODO: remove initials prop, calculate it here
		// then reduce on initials
		const formatted = text
			.split(/\s+/)
			.reduce((prev: string[], curr: string) => [...prev, curr, ' '], []);
		// remove the last element (always unnecessary ' ')
		formatted.length--;
		setFormattedText(formatted);
		const guessMap = new Map<string, Outcome | undefined>(
			formatted.map((word, index) => [`${word}_${index}`, undefined])
		);
		setGuesses(guessMap);
	}, [text]);

	return (
		<Box
			onKeyPress={({ key }) => handleKeyPress(key)}
			_focus={{
				border: '1px solid #63b3ed',
				boxShadow: '0 0 0 1px #63b3ed'
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
				border: '1px solid var(--chakra-colors-whiteAlpha-300)'
			}}
		>
			{formattedText.map((word, index) => {
				const key = `${word}_${index}`;
				console.log(guesses?.get(key));

				return (
					<span
						style={{
							color:
								guesses?.get(key) === 'INCORRECT'
									? 'red'
									: 'green'
						}}
						key={key}
					>
						{guesses?.get(key) ? word : ''}
					</span>
				);
			})}
		</Box>
	);
};

export default HiddenTextarea;
