import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const HiddenTextarea = (): React.ReactElement => {
	const divRef = useRef<any>(null);

	const focusDiv = (): void => {
		divRef?.current?.focus();
	};

	useEffect(() => {
		focusDiv();
	}, []);

	return (
		<Box
			_focus={{
				border: '1px solid #63b3ed',
				boxShadow: '0 0 0 1px #63b3ed'
			}}
			ref={divRef}
			tabIndex={0}
			py='8px'
			minH='80px'
			borderRadius={5}
			w='100%'
			style={{
				outline: '2px solid transparent',
				outlineOffset: 2,
				border: '1px solid var(--chakra-colors-current)'
			}}
		>
			asdasd
		</Box>
	);
};

export default HiddenTextarea;
