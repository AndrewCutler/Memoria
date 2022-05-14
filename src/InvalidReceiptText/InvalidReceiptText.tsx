import {
	Alert,
	Flex,
	AlertIcon,
	AlertDescription,
	CloseButton
} from '@chakra-ui/react';

const InvalidReceiptText = ({
	onDismiss
}: {
	onDismiss: () => void;
}): React.ReactElement => {
	return (
		<Alert status='error' fontSize='sm' borderRadius='5px' mb={2}>
			<Flex flex={1}>
				<AlertIcon />
				<AlertDescription>
					Received text in an invalid format.
				</AlertDescription>
			</Flex>
			<CloseButton
				alignSelf='flex-end'
				position='relative'
				right={-1}
				top={-1}
				onClick={() => onDismiss()}
			/>
		</Alert>
	);
};

export default InvalidReceiptText;
