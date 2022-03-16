import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Results = ({ results }: { results: boolean[] }): React.ReactElement => {
	const [resultText, setResultText] = useState<string>('');

	useEffect(() => {
		const correct = results.filter(Boolean).length;
		const correctPercentage = (correct / results.length) * 100;
		setResultText(
			`${correct} / ${
				results.length
			} correct, for a ${correctPercentage.toPrecision(2)}% success rate.`
		);
	}, [results]);

	return <Box fontSize='1rem'>{resultText}</Box>;
};

export default Results;
