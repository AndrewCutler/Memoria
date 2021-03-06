import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	AccordionIcon,
	useColorModeValue,
	Flex
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import {
	AppContext,
	darkModeAlternateGray,
	lightModeAlternateGray
} from '../App.utility';
import { IStorageValue } from '../TextDisplay/TextDisplay';

// guid_timestamp
const storageKeyRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_[\d]{13}$/;

// timestamp
const timeStampRegex = /[\d]{13}$/;

export const isStorageKeyMatch = (key: string): boolean =>
	storageKeyRegex.test(key);

const getTimeStampFromKey = (key: string): string =>
	key.match(timeStampRegex)?.[0] ?? '';

type KeyedStorageValue = IStorageValue & { key: 'string' };

const History = () => {
	const {
		value: { gameState }
	} = useContext(AppContext);
	const [history, setHistory] = useState<KeyedStorageValue[]>([]);
	const alternateColor = useColorModeValue(
		lightModeAlternateGray,
		darkModeAlternateGray
	);

	useEffect(() => {
		const matchingKeys: string[] = Object.keys(localStorage)
			.filter(isStorageKeyMatch)
			.sort((a, b) =>
				getTimeStampFromKey(a) > getTimeStampFromKey(b) ? 1 : -1
			);
		const entries: KeyedStorageValue[] = matchingKeys.map((key) => {
			const value = JSON.parse(
				localStorage.getItem(key) ?? ''
			) as IStorageValue;

			return {
				...value,
				key
			} as KeyedStorageValue;
		});

		setHistory(entries);
	}, [gameState]);

	return (
		<Flex
			background={alternateColor}
			w='100vw'
			borderTop='1px solid'
			borderTopColor='white.600'
			borderBottom='1px solid'
			borderBottomColor='white.600'
			py={3}
			justifyContent='center'
		>
			<Accordion allowToggle w='80vw'>
				<AccordionItem>
					<AccordionButton>
						<Box textAlign='left' flex='1'>
							View past attempts
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel>
						<TableContainer
							fontSize='sm'
							maxHeight='25vh'
							overflowY='auto'
						>
							<Table variant='simple' size='sm'>
								<Thead>
									<Tr>
										<Th>Accuracy</Th>
										<Th>Result</Th>
									</Tr>
								</Thead>
								<Tbody>
									{history.map(
										({ accuracy, rendered, key }) => {
											return (
												<Tr key={key}>
													<Td>{accuracy}</Td>
													<Td
														dangerouslySetInnerHTML={{
															__html: rendered
														}}
													/>
												</Tr>
											);
										}
									)}
								</Tbody>
							</Table>
						</TableContainer>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Flex>
	);
};

export default History;
