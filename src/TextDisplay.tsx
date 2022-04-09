import { chakra } from '@chakra-ui/react';

const TextDisplay = ({
	text,
	guesses,
	index
}: {
	text: string[];
	guesses: boolean[];
	index: number;
}): React.ReactElement => (
	<>
		{text.slice(0, index).map((word, index) => {
			const key = `${word}_${index}`;

			return (
				<chakra.span
					color={guesses[index] ? 'green.400' : 'red.400'}
					key={key}
				>
					{word + ' '}
				</chakra.span>
			);
		})}
	</>
);

export default TextDisplay;
