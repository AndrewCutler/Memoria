import React, { useState } from 'react';
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

const MAX_LENGTH = 1000;

export const isValidKestroke = (key: string) => key.match(/\w/);

export type GameState = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export const App = () => {
	const [queryParams, setQueryParams] = useState<any>();
	const [hasInvalidParamsError, setHasInvalidParamsError] =
		useState<boolean>(false);
	const [gameState, setGameState] = useState<GameState>('PENDING');
	const [text, setText] = useState<string>('');
	const [isMaxLength, setIsMaxLength] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(0);
	const [guesses, setGuesses] = useState<boolean[]>([]);
	const [formattedText, setFormattedText] = useState<string[]>([]);

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
		const isMaxLength = value.length === MAX_LENGTH;
		setIsMaxLength(isMaxLength);
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
										isInvalid={isMaxLength}
										value={text}
										placeholder='Four score and seven years ago...'
										isDisabled={inProgress}
										maxLength={MAX_LENGTH}
										color={inProgress ? 'black' : 'current'}
										bg={inProgress ? 'black' : 'inherit'}
									/>
								)}
								<Flex
									my={3}
									w='100%'
									justifyContent='space-between'
								>
									<Box>
										{isMaxLength && (
											<Text
												fontSize='xs'
												color='gray.400'
											>
												Very ambitious, but there's a{' '}
												{MAX_LENGTH} character limit
											</Text>
										)}
									</Box>
									{(inProgress || completed) && (
										<Box>
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
											{text.trim() && (
												<Share text={text} />
											)}
										</Box>
									)}
									{pending && (
										<Box>
											<Button
												onClick={handleStart}
												disabled={
													inProgress || !text.trim()
												}
											>
												<Text mr='4px'>Start</Text>
												<GoCheck />
											</Button>
											{text.trim() && (
												<Share text={text} />
											)}
										</Box>
									)}
								</Flex>
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
