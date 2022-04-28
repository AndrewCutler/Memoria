import React from 'react';
import {
	ChakraProvider,
	Box,
	VStack,
	Textarea,
	Flex,
	Button,
	extendTheme
} from '@chakra-ui/react';
import ActiveTextarea from './ActiveTextarea';
import Results from './Results';
import TextDisplay from './TextDisplay';
import Title from './Title';

export const isValidKestroke = (key: string) => key.match(/\w/);

export type GameState = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export const App = () => {
	const [gameState, setGameState] = React.useState<GameState>('PENDING');
	const [text, setText] = React.useState<string>('');

	const [index, setIndex] = React.useState<number>(0);
	const [guesses, setGuesses] = React.useState<boolean[]>([]);
	const [formattedText, setFormattedText] = React.useState<string[]>([]);

	const pending = gameState === 'PENDING';
	const inProgress = gameState === 'IN PROGRESS';
	const completed = gameState === 'COMPLETE';

	const theme = extendTheme({
		fonts: {
			body: 'Inconsolata, sans-serif'
		}
	});

	const handleTextChange = (value: string): void => {
		setText(value);
	};

	const handleStart = (): void => {
		setGameState('IN PROGRESS');
	};

	const handleRestart = (): void => {
		setGuesses([]);
		setIndex(0);
		setGameState('IN PROGRESS');
	};

	React.useEffect(() => {
		setFormattedText(text.split(/\s+/));
		setGuesses([]);
		setIndex(0);
	}, [text]);

	const handleComplete = (): void => {
		setGameState('COMPLETE');
	};

	React.useEffect(() => {
		if (index && index === formattedText.length) {
			handleComplete();
		}
	}, [index, formattedText]);

	const handleKeyPress = (key: string): void => {
		if (!completed && isValidKestroke(key)) {
			const isCorrect =
				key.toLowerCase() ===
				formattedText[index].charAt(0).toLowerCase();
			setGuesses((prev) => [...prev, isCorrect]);
			setIndex((prev) => ++prev);
		}
	};

	const handleReset = (): void => {
		setGameState('PENDING');
		setText('');
	};

	return (
		<ChakraProvider theme={theme}>
			<Title />
			<Box textAlign='center' fontSize='xl'>
				<Box minH='100vh' p={3}>
					<VStack spacing={8}>
						<Box minH='10vh'>
							<Box fontSize='sm' px='15%'>
								Paste your desired text into the box. Then,
								enter the first letter of each word as you
								remember it. Green means it's right, red means
								it's wrong. Repeat until you've memorized it!
							</Box>
							<Flex align='flex-end' direction='column' mt={4}>
								{inProgress || completed ? (
									<ActiveTextarea
										gameState={gameState}
										onKeyPress={handleKeyPress}
									>
										<TextDisplay
											text={formattedText}
											guesses={guesses}
											index={index}
										/>
									</ActiveTextarea>
								) : (
									<Textarea
										onChange={({ target: { value } }) =>
											handleTextChange(value)
										}
										placeholder='Four score and seven years ago...'
										isDisabled={inProgress}
										color={inProgress ? 'black' : 'current'}
										bg={inProgress ? 'black' : 'inherit'}
									/>
								)}
								<Box my={3}>
									{(inProgress || completed) && (
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
									{pending && (
										<Button
											ml={1}
											onClick={handleStart}
											disabled={
												inProgress || !text.trim()
											}
										>
											Start
										</Button>
									)}
								</Box>
								{completed && <Results results={guesses} />}
							</Flex>
						</Box>
					</VStack>
				</Box>
			</Box>
		</ChakraProvider>
	);
};
