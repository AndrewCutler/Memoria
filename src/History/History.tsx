import React, { useEffect, useState } from 'react';

const storageKeyRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_[\d]{13}$/;

export const isStorageKeyMatch = (key: string) => storageKeyRegex.test(key);

const History = () => {
	const [history, setHistory] = useState<string[]>([]);

	useEffect(() => {
		const keys: string[] =
			Object.keys(localStorage).filter(isStorageKeyMatch);
		const entries: string[] = keys.map(
			(key) => localStorage.getItem(key) ?? ''
		);
		setHistory(entries);
		console.dir(entries);
	}, []);

	return <div>{history.map((element) => JSON.stringify(element))}</div>;
};

export default History;
