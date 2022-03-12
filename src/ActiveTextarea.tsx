import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const HiddenTextarea = ({
	initials,
	text
}: {
	initials: string[];
	text: string;
}): React.ReactElement => {
	const divRef = useRef<any>(null);

	const [formattedText, setFormattedText] = useState<string[]>([]);

	const focusDiv = (): void => {
		divRef?.current?.focus();
	};

	const handleKeyPress = (key: string): void => {
		console.log(key);
	};

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
				return (
					<span
						style={{ color: true ? 'red' : 'green' }}
						key={`${word}_${index}`}
					>
						{word}
					</span>
				);
			})}
		</Box>
	);
};

export default HiddenTextarea;
