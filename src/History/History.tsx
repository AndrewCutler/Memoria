import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IStorageValue } from '../TextDisplay/TextDisplay';

// guid_timestamp
const storageKeyRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_[\d]{13}$/;

export const isStorageKeyMatch = (key: string): boolean =>
	storageKeyRegex.test(key);

type KeyedStorageValue = IStorageValue & { key: 'string' };

const History = () => {
	const [history, setHistory] = useState<KeyedStorageValue[]>([]);

	useEffect(() => {
		const matchingKeys: string[] = Object.keys(localStorage)
			.filter(isStorageKeyMatch)
			.sort((a, b) => (a > b ? 1 : -1));
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
	}, []);

	return (
		<div>
			<TableContainer maxWidth='80vw' fontSize='sm'>
				<Table variant='simple' size='sm'>
					<Thead>
						<Tr>
							<Th>Accuracy</Th>
							<Th>Result</Th>
						</Tr>
					</Thead>
					<Tbody>
						{history.map(({ accuracy, rendered, key }) => {
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
						})}
					</Tbody>
				</Table>
			</TableContainer>
			{/* {history.map((element) => JSON.stringify(element))} */}
		</div>
	);
};

export default History;
