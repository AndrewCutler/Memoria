import { Box, Tooltip, Text, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { GoCheck } from 'react-icons/go';
import { HiRefresh } from 'react-icons/hi';
import { MdClear } from 'react-icons/md';
import { AppContext } from '../App.utility';
import Share from '../Share/Share';
import { v4 as uuid } from 'uuid';

const ActionButtons = (): React.ReactElement => {
	const {
		value: { gameState, targetText },
		setter: setContext
	} = useContext(AppContext);

	const pending = gameState === 'PENDING';
	const inProgress = gameState === 'IN PROGRESS';

	const handleStart = (): void => {
		setContext((prev) => ({
			...prev,
			gameState: 'IN PROGRESS',
			currentUuid: uuid()
		}));
	};

	const handleRetry = (): void => {
		setContext((prev) => ({
			...prev,
			index: 0,
			guesses: [],
			gameState: 'IN PROGRESS'
		}));
	};

	const handleClear = (): void => {
		// fix this
		setContext((prev) => ({
			...prev,
			targetText: '',
			gameState: 'PENDING',
			currentUuid: ''
		}));
	};

	return (
		<>
			{pending ? (
				<Box>
					<Button
						onClick={handleStart}
						disabled={inProgress || !targetText.trim()}
					>
						<Text mr='4px'>Start</Text>
						<GoCheck />
					</Button>
					{targetText.trim() && <Share />}
				</Box>
			) : (
				<Box>
					<Tooltip label='Wipe out this text and try with a new one'>
						<Button onClick={handleClear}>
							<Text mr='4px'>Clear</Text>
							<MdClear />
						</Button>
					</Tooltip>
					<Button ml={1} onClick={handleRetry}>
						<Text mr='4px'>Retry</Text>
						<HiRefresh />
					</Button>
					{targetText.trim() && <Share />}
				</Box>
			)}
		</>
	);
};

export default ActionButtons;
