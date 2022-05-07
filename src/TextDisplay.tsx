import { chakra } from '@chakra-ui/react';

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

			const displayText = (
				<chakra.span
					color={guesses[index] ? 'green.400' : 'red.400'}
					key={key}
				>
					{word + ' '}
				</chakra.span>
			);

			if (completed) {
				localStorage.setItem(storageKey, displayText.toString());
			}

			return displayText;
		})}
	</>
);

export default TextDisplay;
