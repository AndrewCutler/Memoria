import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

const green = '#48bb78';
const red = '#f56565';

export interface IStorageValue {
	rendered: string;
	text: string;
	accuracy: number;
}

const TextDisplay = ({
	text,
	guesses,
	index,
	storageKey,
	completed
}: {
	text: string[];
	guesses: boolean[];
	index: number;
	storageKey: string;
	completed: boolean;
}): React.ReactElement => {
	const [displayText, setDisplayText] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (completed) {
			const final = <div>{[...displayText]}</div>;
			const finalAsString = ReactDOMServer.renderToStaticMarkup(final);
			localStorage.setItem(
				storageKey,
				JSON.stringify({
					rendered: finalAsString,
					text: 'TEST',
					accuracy: 75
				})
			);
		}
	}, [completed, displayText, storageKey]);

	useEffect(() => {
		const result = text.slice(0, index).map((word, index) => {
			const key = `${word}_${index}`;

			// cannot use chakra styling syntax/variables as it compiles to stuff like class="css-1ou2t5u"
			const displayText = (
				<span style={{ color: guesses[index] ? green : red }} key={key}>
					{word + ' '}
				</span>
			);

			return displayText;
		});
		setDisplayText(result);
	}, [guesses, index, storageKey, text]);

	return <>{[...displayText]}</>;
};

export default TextDisplay;
