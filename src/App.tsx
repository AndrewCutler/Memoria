import React, { createContext, useEffect, useState } from 'react';
import {
	ChakraProvider,
	Box,
	VStack,
	Textarea,
	Flex,
	Button,
	extendTheme,
	Text,
	Divider
} from '@chakra-ui/react';
import ActiveTextarea from './ActiveTextArea/ActiveTextarea';
import Results from './Results/Results';
import TextDisplay from './TextDisplay/TextDisplay';
import Title from './Title/Title';
import { GoCheck } from 'react-icons/go';
import { MdClear } from 'react-icons/md';
import InformationalTabset from './InformationTabset/InformationalTabset';
import { HiRefresh } from 'react-icons/hi';
import { decrypt } from './crypt';
import Share from './Share/Share';
import { v4 as uuid } from 'uuid';
import History from './History/History';
import InvalidReceiptText from './InvalidReceiptText/InvalidReceiptText';
import ActionButtons from './ActionButtons/ActionButtons';
import {
	appContext,
	AppContext,
	GameState,
	IAppContext,
	isValidKestroke,
	MAX_LENGTH
} from './App.utility';

export const App = () => {
	const [context, setContext] = useState<IAppContext>(appContext);
	const [queryParams, setQueryParams] = useState<any>();
	const [hasInvalidParamsError, setHasInvalidParamsError] =
		useState<boolean>(false);
	const [gameState, setGameState] = useState<GameState>('PENDING');
	// const [targetText, setTargetText] = useState<string>('');
	const [isMaxLength, setIsMaxLength] = useState<boolean>(false);
	const [showHistory, setShowHistory] = useState<boolean>(false);
	// const [index, setIndex] = useState<number>(0);
	// const [guesses, setGuesses] = useState<boolean[]>([]);
	// const [targetTextWords, setTargetTextWords] = useState<string[]>([]);
	const [currentUuid, setCurrentUuid] = useState<string>('');
	const [key, setKey] = useState<string>('');

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
		// setTargetText(value);
		setContext((prev) => ({
			...prev,
			targetText: value
		}));
	};

	const handleStart = (): void => {
		setGameState('IN PROGRESS');
		setCurrentUuid(uuid());
	};

	const handleRestart = (): void => {
		// setGuesses([]);
		setContext((prev) => ({ ...prev, index: 0, guesses: [] }));
		// setIndex(0);
		setGameState('IN PROGRESS');
	};

	const handleReset = (): void => {
		// fix this
		setGameState('PENDING');
		// setTargetText('');
		setContext((prev) => ({
			...prev,
			targetText: ''
		}));
		setCurrentUuid('');
	};

	useEffect(() => {
		// setTargetTextWords(targetText.split(/\s+/));
		setContext((prev) => ({
			...prev,
			index: 0,
			guesses: [],
			targetTextWords: context.targetText.split(/s+/)
		}));
		// setGuesses([]);
		// setIndex(0);
	}, [context.targetText]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setQueryParams(params as any);
	}, []);

	useEffect(() => {
		const param = queryParams?.get('target');
		if (param) {
			const target = decrypt(param);
			if (target.trim()) {
				handleTextChange(target);
			} else {
				// TODO: this is no longer ever triggered because all values seem to be valid,
				// but they produce gibberish.
				// check if valid unicode?
				setHasInvalidParamsError(true);
			}
		}
	}, [queryParams]);

	useEffect(() => {
		if (context.index && context.index === context.targetTextWords.length) {
			setGameState('COMPLETE');
			const timestamp = new Date().valueOf();
			const key = `${currentUuid}_${timestamp}`;
			setKey(key);
		}
	}, [context.index, context.targetTextWords, currentUuid]);

	const handleKeyPress = (key: string): void => {
		if (!completed && isValidKestroke(key)) {
			const isCorrect =
				key.toLowerCase() ===
				context.targetTextWords[context.index].charAt(0).toLowerCase();
			// setGuesses((prev) => [...prev, isCorrect]);
			setContext((prev) => ({
				...prev,
				index: ++prev.index,
				guesses: [...prev.guesses, isCorrect]
			}));
			// setIndex((prev) => ++prev);
		}
	};

	return (
		<AppContext.Provider value={{ value: context, setter: setContext }}>
			<ChakraProvider theme={theme}>
				<Title />
				<ActionButtons />
				<Box textAlign='center' fontSize='xl'>
					<Box minH='100vh' p={3}>
						<VStack spacing={8}>
							<Box minH='10vh'>
								{hasInvalidParamsError && (
									<InvalidReceiptText
										onDismiss={() =>
											setHasInvalidParamsError(false)
										}
									/>
								)}
								<Box fontSize='sm' px='15%'>
									Enter your desired text into the box. Then,
									enter the first letter of each word as you
									remember it. Green means it's right, red
									means it's wrong. Repeat until you've
									memorized it!
								</Box>
								<Button onClick={() => setShowHistory(true)}>
									Show history
								</Button>
								<Flex
									align='flex-end'
									direction='column'
									mt={4}
								>
									{inProgress || completed ? (
										<ActiveTextarea
											gameState={gameState}
											onKeyPress={handleKeyPress}
										>
											<TextDisplay
												// remove prop
												text={context.targetTextWords}
												// remove prop
												guesses={context.guesses}
												// remove prop
												index={context.index}
												storageKey={key}
												completed={completed}
											/>
										</ActiveTextarea>
									) : (
										<Textarea
											onChange={({ target: { value } }) =>
												handleTextChange(value)
											}
											isInvalid={isMaxLength}
											value={context.targetText}
											placeholder='Four score and seven years ago...'
											isDisabled={inProgress}
											maxLength={MAX_LENGTH}
											color={
												inProgress ? 'black' : 'current'
											}
											bg={
												inProgress ? 'black' : 'inherit'
											}
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
													Very ambitious, but there's
													a {MAX_LENGTH} character
													limit
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
													<Text mr='4px'>
														Restart
													</Text>
													<HiRefresh />
												</Button>
												{context.targetText.trim() && (
													<Share />
												)}
											</Box>
										)}
										{pending && (
											<Box>
												<Button
													onClick={handleStart}
													disabled={
														inProgress ||
														!context.targetText.trim()
													}
												>
													<Text mr='4px'>Start</Text>
													<GoCheck />
												</Button>
												{context.targetText.trim() && (
													<Share />
												)}
											</Box>
										)}
									</Flex>
									{/* remove prop */}
									{completed && (
										<Results results={context.guesses} />
									)}
								</Flex>
							</Box>
							{showHistory && <History />}
							<Box h='16px' w='100%' />
							<Divider />
							<InformationalTabset />
						</VStack>
					</Box>
				</Box>
			</ChakraProvider>
		</AppContext.Provider>
	);
};
