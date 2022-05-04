import React from 'react';
import {
	ChakraProvider,
	Box,
	VStack,
	Textarea,
	Flex,
	Button,
	extendTheme,
	Text,
	Divider,
	Alert,
	AlertIcon,
	CloseButton,
	AlertDescription
} from '@chakra-ui/react';
import ActiveTextarea from './ActiveTextarea';
import Results from './Results';
import TextDisplay from './TextDisplay';
import Title from './Title';
import { GoCheck } from 'react-icons/go';
import { MdClear } from 'react-icons/md';
import InformationalTabset from './InformationalTabset';
import { HiRefresh } from 'react-icons/hi';
import { decrypt } from './crypt';
import Share from './Share';

export const isValidKestroke = (key: string) => key.match(/\w/);
const validateMaxWordLength = (text: string): boolean => {
	// a very imperfect calculation, at the very least because it counts punctuation as a word but we'll go with it
	const MAX_WORD_COUNT = 500;
	const wordCount = text.split(/(\w+)/).filter((w) => w.trim()).length;

	return wordCount <= MAX_WORD_COUNT;
};

export type GameState = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export const App = () => {
	const [queryParams, setQueryParams] = React.useState<any>();
	const [hasInvalidParamsError, setHasInvalidParamsError] =
		React.useState<boolean>(false);
	const [gameState, setGameState] = React.useState<GameState>('PENDING');
	const [text, setText] = React.useState<string>('');
	const [isValid, setIsValid] = React.useState<boolean>(true);
	const [index, setIndex] = React.useState<number>(0);
	const [guesses, setGuesses] = React.useState<boolean[]>([]);
	const [formattedText, setFormattedText] = React.useState<string[]>([]);

	const pending = gameState === 'PENDING';
	const inProgress = gameState === 'IN PROGRESS';
	const completed = gameState === 'COMPLETE';

	const theme = extendTheme({
		fonts: {
			body: 'Inconsolata, sans-serif'
		},
		components: {
			Link: {
				baseStyle: {
					textDecoration: 'underline'
				}
			}
		}
	});

	const handleTextChange = (value: string): void => {
		const isValid = validateMaxWordLength(value);
		setIsValid(isValid);
		if (isValid) {
			setText(value);
		}
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

	React.useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setQueryParams(params as any);
	}, []);

	React.useEffect(() => {
		const param = queryParams?.get('target');
		if (param) {
			const target = decrypt(param);
			if (target.trim()) {
				handleTextChange(target);
			} else {
				setHasInvalidParamsError(true);
			}
		}
	}, [queryParams]);

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
							{hasInvalidParamsError && (
								<Alert
									status='error'
									fontSize='sm'
									borderRadius='5px'
									mb={2}
								>
									<Flex flex={1}>
										<AlertIcon />
										<AlertDescription>
											Received text in an invalid format.
										</AlertDescription>
									</Flex>
									<CloseButton
										alignSelf='flex-end'
										position='relative'
										right={-1}
										top={-1}
										onClick={() =>
											setHasInvalidParamsError(false)
										}
									/>
								</Alert>
							)}
							<Box fontSize='sm' px='15%'>
								Enter your desired text into the box. Then,
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
										isInvalid={!isValid}
										value={text}
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
												<Text mr='4px'>Reset</Text>
												<MdClear />
											</Button>
											<Button
												ml={1}
												onClick={handleRestart}
											>
												<Text mr='4px'>Restart</Text>
												<HiRefresh />
											</Button>
										</>
									)}
									{pending && (
										<Button
											onClick={handleStart}
											disabled={
												inProgress || !text.trim()
											}
										>
											<Text mr='4px'>Start</Text>
											<GoCheck />
										</Button>
									)}
									{text.trim() && <Share text={text} />}
								</Box>
								{completed && <Results results={guesses} />}
							</Flex>
						</Box>
						<Box h='16px' w='100%' />
						<Divider />
						<InformationalTabset />
					</VStack>
				</Box>
			</Box>
		</ChakraProvider>
	);
};
