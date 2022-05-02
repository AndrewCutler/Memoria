import { forwardRef, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { cipher, decipher } from './caesar';
const Share = forwardRef(({ ...rest }, ref): React.ReactElement => {
	const toast = useToast();

	const handleShare = () => {
		const x = cipher('once upon a time i gave 100%', 1);
		const y = decipher('podf!vqpo!b!ujnf!j!hbwf!211&', 1);
		toast({
			description: 'URL copied',
			status: 'success',
			duration: 1500,
			isClosable: true,
			position: 'top-right'
		});
	};

	// TODO: move to somewhere visible before Start is clicked
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
