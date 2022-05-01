import { forwardRef, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import aes from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

const secret = 'memoria_app';

const Share = forwardRef(({ ...rest }, ref): React.ReactElement => {
	const handleShare = () => {
		const encrypted = aes.encrypt('test string', secret).toString();
		console.log(encrypted);
	};

	return (
		<IconButton
			size='md'
			fontSize='lg'
			variant='ghost'
			color='current'
			marginLeft='2'
			onClick={handleShare}
			icon={<FaShareAlt />}
			aria-label='Share this text with someone else for them to memorize it'
			ref={ref}
			{...rest}
		/>
	);
});

export default Share;
