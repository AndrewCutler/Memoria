import { forwardRef, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { encrypt } from './crypt';

const Share = forwardRef(({ ...rest }, ref): React.ReactElement => {
	const toast = useToast();

	const handleShare = () => {
		const hex = encrypt(rest.text);
		const url = `${window.location.origin}?target=${hex}`;
		navigator.clipboard.writeText(url);
		toast({
			description: 'URL copied',
			status: 'success',
			duration: 1500,
			isClosable: true,
			position: 'top-right'
		});
	};

	return (
		<Tooltip label='Share this text for someone else to practice it'>
			<IconButton
				size='md'
				fontSize='lg'
				variant='ghost'
				color='current'
				marginLeft='1'
				onClick={handleShare}
				icon={<FaShareAlt />}
				aria-label='Share this text with someone else for them to memorize it'
				ref={ref}
				{...rest}
			/>
		</Tooltip>
	);
});

export default Share;
