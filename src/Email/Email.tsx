import { Box, Button, Flex, Textarea } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAIL_MAX = 5000;

const Email = (): React.ReactElement => {
	const form = useRef<any>(null);

	const [body, setBody] = useState<string>('');

	const handleChange = (value: string): void => {
		setBody(value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICEID ?? '',
				process.env.REACT_APP_EMAILJS_TEMPLATEID ?? '',
				form.current!,
				process.env.REACT_APP_EMAILJS_PUBLICKEY ?? ''
			)
			.then((response) => {
				if (response?.status === 200) {
					// cleanup
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Box mb={1} fontSize='sm'>
				Thoughts? Suggestions? Bugs? Let me know.
			</Box>
			<Box w='75%'>
				<form
					action=''
					ref={form}
					onSubmit={(event) => handleSubmit(event)}
				>
					<Textarea
						value={body}
						maxLength={EMAIL_MAX}
						name='message'
						placeholder='Great site, man!'
						onChange={({ target: { value } }) =>
							handleChange(value)
						}
					/>
					<Flex w='100%' marginTop={2} justifyContent='flex-end'>
						<Button disabled={!body.trim()} type='submit'>
							Submit
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
};

export default Email;
