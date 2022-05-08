import { chakra } from '@chakra-ui/react';
import ReactDOMServer from 'react-dom/server';

const green = '#48bb78';
const red = '#f56565';

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
}): React.ReactElement => (
	<>
		{text.slice(0, index).map((word, index) => {
			const key = `${word}_${index}`;

			// cannot use chakra styling syntax/variables as it compiles to stuff like class="css-1ou2t5u"
			const displayText = (
				<chakra.span
					style={{ color: guesses[index] ? green : red }}
					key={key}
				>
					{word + ' '}
				</chakra.span>
			);

			if (completed) {
				console.log(ReactDOMServer.renderToStaticMarkup(displayText));
				localStorage.setItem(storageKey, displayText.toString());
			}

			return displayText;
		})}
	</>
);

export default TextDisplay;
