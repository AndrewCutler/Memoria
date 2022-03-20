import * as React from 'react';
import {
	ChakraProvider,
	Box,
	VStack,
	Grid,
	theme,
	Textarea,
	Flex,
	Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import HiddenTextarea from './ActiveTextarea';
import Results from './Results';

export type GameState = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';



export const App = () => {
	const [gameState, setGameState] = React.useState<GameState>('PENDING');
	const [text, setText] = React.useState<string>('');
	const [results, setResults] = React.useState<boolean[]>([]);

	const pending = gameState === 'PENDING';
	const started = gameState === 'IN PROGRESS';
	const completed = gameState === 'COMPLETE';

	const handleTextPaste = (value: string): void => {
		setText(value);
	};

	const handleStart = (): void => {
		setGameState('IN PROGRESS');
	};

	const handleRestart = (): void => {
		setGameState('PENDING');
	};

	const handleReset = (): void => {
		setGameState('PENDING');
		setText('');
	};

	const handleComplete = (results: boolean[]): void => {
		// setStarted(false);
		setResults(results);
		setGameState('COMPLETE');
		console.log('Retry');
	};

	return (
		<ChakraProvider theme={theme}>
			<Box textAlign='center' fontSize='xl'>
				<Box minH='100vh' p={3}>
					<ColorModeSwitcher justifySelf='flex-end' />
					<VStack spacing={8}>
						<Box minH='10vh'>
							<h6>How it works</h6>
							<Box fontSize='sm' px='15%'>
								Paste your desired text into the box. Then,
								enter the first letter of each word as you
								remember it. Green means it's right, red means
								it's wrong. Repeat until you've memorized it!
							</Box>
							<Flex align='flex-end' direction='column' mt={2}>
								{started ? (
									<HiddenTextarea
										text={text.trim()}
										onComplete={handleComplete}
									/>
								) : (
									<Textarea
										onChange={({ target: { value } }) =>
											handleTextPaste(value)
										}
										placeholder='Paste text here'
										isDisabled={started}
										color={started ? 'black' : 'current'}
										bg={started ? 'black' : 'inherit'}
									/>
								)}
								<Box my={3}>
									{started && (
										<>
											<Button onClick={handleReset}>
												Reset
											</Button>
											<Button
												ml={1}
												onClick={handleRestart}
											>
												Restart
											</Button>
										</>
									)}
									{!started && (
										<Button
											ml={1}
											onClick={handleStart}
											disabled={started || !text.trim()}
										>
											Start
										</Button>
									)}
								</Box>
								{completed && <Results results={results} />}
							</Flex>
						</Box>
					</VStack>
				</Box>
			</Box>
		</ChakraProvider>
	);
};
