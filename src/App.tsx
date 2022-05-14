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
	Divider
} from '@chakra-ui/react';
import ActiveTextarea from './ActiveTextArea/ActiveTextarea';
import Results from './Results/Results';
import TextDisplay from './TextDisplay/TextDisplay';
import Title from './Title/Title';
import InformationalTabset from './InformationTabset/InformationalTabset';
import { decrypt } from './crypt';
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
	// app state
	const [context, setContext] = useState<IAppContext>(appContext);
	const [queryParams, setQueryParams] = useState<URLSearchParams>();
	const [hasInvalidParamsError, setHasInvalidParamsError] =
		useState<boolean>(false);
	const [isMaxLength, setIsMaxLength] = useState<boolean>(false);
	const [hasHistory, setHasHistory] = useState<boolean>(false);
	const [showHistory, setShowHistory] = useState<boolean>(false);
	const [key, setKey] = useState<string>('');

	const pending = context.gameState === 'PENDING';
	const inProgress = context.gameState === 'IN PROGRESS';
	const completed = context.gameState === 'COMPLETE';

	// Chakra theme
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

	// event handlers
	const handleTextChange = (value: string): void => {
		const isMaxLength = value.length === MAX_LENGTH;
		setIsMaxLength(isMaxLength);
		setContext((prev) => ({
			...prev,
			targetText: value
		}));
	};

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

	// useEffects
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setQueryParams(params);
	}, []);

	useEffect(() => {
		setContext((prev) => ({
			...prev,
			index: 0,
			guesses: [],
			targetTextWords: context.targetText.split(/\s+/)
		}));
	}, [context.targetText]);

	useEffect(() => {
		const hasKeysInStorage =
			Object.keys(localStorage).filter(isStorageKeyMatch)?.length > 0;
		setHasHistory(hasKeysInStorage);

		// if (process.env.NODE_ENV === 'development') {
		// 	console.log(context);
		// }
	}, [context]);

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
		if (
			context.index > 0 &&
			context.index === context.targetTextWords.length
		) {
			setContext((prev) => ({ ...prev, gameState: 'COMPLETE' }));
			const timestamp = new Date().valueOf();
			const key = `${context.currentUuid}_${timestamp}`;
			setKey(key);
		}
	}, [context.index, context.targetTextWords, context.currentUuid]);

	return (
		<AppContext.Provider value={{ value: context, setter: setContext }}>
			<ChakraProvider theme={theme}>
				<Title />
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
								<Flex
									align='flex-end'
									direction='column'
									mt={4}
								>
									{pending ? (
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
									) : (
										<ActiveTextarea
											onKeyPress={handleKeyPress}
										>
											<TextDisplay storageKey={key} />
										</ActiveTextarea>
									)}
									<Flex
										my={1}
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
										<ActionButtons />
									</Flex>
									{/* TODO: change to accordion */}
									{hasHistory && (
										<Flex
											my={1}
											w='100%'
											justifyContent='flex-end'
										>
											<Button
												onClick={() =>
													setShowHistory(!showHistory)
												}
											>
												Show history
											</Button>
										</Flex>
									)}
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
