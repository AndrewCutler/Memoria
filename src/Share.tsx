import { forwardRef, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

const Share = forwardRef(({ ...rest }, ref): React.ReactElement => {
	const handleShare = () => {
		console.log('share');
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
