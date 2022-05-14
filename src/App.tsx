import React, { useEffect, useState } from 'react';
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
	Tooltip
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
import History, { isStorageKeyMatch } from './History/History';
import InvalidReceiptText from './InvalidReceiptText/InvalidReceiptText';
import ActionButtons from './ActionButtons/ActionButtons';
import {
	appContext,
	AppContext,
	IAppContext,
	isValidKestroke,
	MAX_LENGTH
} from './App.utility';

export const App = () => {
	const [context, setContext] = useState<IAppContext>(appContext);
	const [queryParams, setQueryParams] = useState<URLSearchParams>();
	const [hasInvalidParamsError, setHasInvalidParamsError] =
		useState<boolean>(false);
	const [isMaxLength, setIsMaxLength] = useState<boolean>(false);
	const [hasHistory, setHasHistory] = useState<boolean>(false);
	const [showHistory, setShowHistory] = useState<boolean>(false);
	const [currentUuid, setCurrentUuid] = useState<string>('');
	const [key, setKey] = useState<string>('');

	const pending = context.gameState === 'PENDING';
	const inProgress = context.gameState === 'IN PROGRESS';
	const completed = context.gameState === 'COMPLETE';

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
		setContext((prev) => ({
			...prev,
			targetText: value
		}));
	};

	const handleStart = (): void => {
		setCurrentUuid(uuid());
		setContext((prev) => ({ ...prev, gameState: 'IN PROGRESS' }));
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
			gameState: 'PENDING'
		}));
		setCurrentUuid('');
	};

	useEffect(() => {
		setContext((prev) => ({
			...prev,
			index: 0,
			guesses: [],
			targetTextWords: context.targetText.split(/\s+/)
		}));
	}, [context.targetText]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setQueryParams(params);

		const hasKeysInStorage =
			Object.keys(localStorage).filter(isStorageKeyMatch)?.length > 0;
		setHasHistory(hasKeysInStorage);
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
		if (context.index === context.targetTextWords.length) {
			setContext((prev) => ({ ...prev, gameState: 'COMPLETE' }));
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
			setContext((prev) => ({
				...prev,
				index: ++prev.index,
				guesses: [...prev.guesses, isCorrect]
			}));
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
								{hasHistory && (
									<Button
										onClick={() => setShowHistory(true)}
									>
										Show history
									</Button>
								)}
								<Flex
									align='flex-end'
									direction='column'
									mt={4}
								>
									{inProgress || completed ? (
										<ActiveTextarea
											onKeyPress={handleKeyPress}
										>
											<TextDisplay storageKey={key} />
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
												<Tooltip label='Wipe out this text and try with a new one'>
													<Button
														onClick={handleClear}
													>
														<Text mr='4px'>
															Clear
														</Text>
														<MdClear />
													</Button>
												</Tooltip>
												<Button
													ml={1}
													onClick={handleRetry}
												>
													<Text mr='4px'>Retry</Text>
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
									{completed && <Results />}
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
