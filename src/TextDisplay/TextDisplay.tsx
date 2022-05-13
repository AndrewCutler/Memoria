import { useContext, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppContext } from '../App.utility';

const green = '#48bb78';
const red = '#f56565';

export interface IStorageValue {
	rendered: string;
	text: string;
	accuracy: number;
}

const TextDisplay = ({
	storageKey
}: {
	storageKey: string;
}): React.ReactElement => {
	const {
		value: { targetTextWords, guesses, index, gameState }
	} = useContext(AppContext);
	const [displayText, setDisplayText] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (gameState === 'COMPLETE') {
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
	}, [gameState, displayText, storageKey]);

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
