import { useContext, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppContext } from '../App.utility';

const green = '#48bb78';
const red = '#f56565';

export interface IStorageValue {
	rendered: string;
	text: string;
	accuracy: string;
}

const TextDisplay = ({
	storageKey
}: {
	storageKey: string;
}): React.ReactElement => {
	const {
		value: { targetText, targetTextWords, guesses, index, gameState }
	} = useContext(AppContext);
	const [displayText, setDisplayText] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (gameState === 'COMPLETE') {
			const final = <div>{[...displayText]}</div>;
			const finalAsString = ReactDOMServer.renderToStaticMarkup(final);
			// TODO: consider moving this to context as it is also calculated in Results.tsx
			const correct = guesses.filter(Boolean).length;
			const accuracy = ((correct / guesses.length) * 100).toPrecision(3);
			localStorage.setItem(
				storageKey,
				JSON.stringify({
					rendered: finalAsString,
					text: targetText,
					accuracy
				} as IStorageValue)
			);
		}
	}, [gameState, displayText, storageKey, targetText, guesses]);

	useEffect(() => {
		const result = targetTextWords.slice(0, index).map((word, index) => {
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
	}, [guesses, index, storageKey, targetTextWords]);

	return <>{[...displayText]}</>;
};

export default TextDisplay;
