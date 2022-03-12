import * as React from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	Link,
	VStack,
	Code,
	Grid,
	theme,
	Textarea,
	Flex,
	Button,
	Input
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import HiddenTextarea from './ActiveTextarea';

export const App = () => {
	const [started, setStarted] = React.useState<boolean>(false);
	const [text, setText] = React.useState<string>('');
	const [initials, setInitials] = React.useState<string[]>([]);

	const handleTextPaste = (value: string): void => {
		setText(value);
	};

	const handleStart = (): void => {
		setStarted(true);
		setInitials(
			text.split(/\s+/).map((word) => word.charAt(0).toLowerCase())
		);
	};

	const handleReset = (): void => {
		setStarted(false);
	};

	const handleComplete = (): void => {
		setStarted(false);
		console.log('Retry');
	};

	return (
		<ChakraProvider theme={theme}>
			<Box textAlign='center' fontSize='xl'>
				<Grid minH='100vh' p={3}>
					<ColorModeSwitcher justifySelf='flex-end' />
					<VStack spacing={8}>
						<Box minH='10vh'>
							<h6>How it works</h6>
							<Box fontSize='sm' px='15%'>
								Paste your desired text into the box. Then,
								enter the first letter of each word as you
								remember it. If correct, the word will be
								displayed. Repeat until you've memorized it!
							</Box>
							<Flex align='flex-end' direction='column' mt={2}>
								{started && (
									<HiddenTextarea
										initials={initials}
										text={text}
										onComplete={handleComplete}
									/>
								)}
								<Textarea
									onChange={({ target: { value } }) =>
										handleTextPaste(value)
									}
									placeholder='Paste text here'
									isDisabled={started}
									color={started ? 'black' : 'current'}
									bg={started ? 'black' : 'inherit'}
								/>
								<Box my={3}>
									{started && (
										<Button onClick={handleReset}>
											Reset
										</Button>
									)}
									<Button
										ml={1}
										onClick={handleStart}
										disabled={started || !text.trim()}
									>
										Start
									</Button>
								</Box>
							</Flex>
						</Box>
					</VStack>
				</Grid>
			</Box>
		</ChakraProvider>
	);
};
