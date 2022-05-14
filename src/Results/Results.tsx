import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.utility';

const Results = (): React.ReactElement => {
	const {
		value: { guesses }
	} = useContext(AppContext);
	const [resultText, setResultText] = useState<string>('');

	useEffect(() => {
		const correct = guesses.filter(Boolean).length;
		const correctPercentage = (correct / guesses.length) * 100;
		setResultText(
			`${correct} / ${guesses.length} (${correctPercentage.toPrecision(
				3
			)}%) correct.`
		);
	}, [guesses]);

	return <Box fontSize='1rem'>{resultText}</Box>;
};

export default Results;
