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
		console.log('submit', form.current);
		emailjs
			.sendForm(
				'service_boun72d',
				'template_p18c5vn',
				form.current!,
				'kd8ThrT5TmcuVT5si'
			)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Box textAlign='left'>
			<Box mb={1} fontSize='sm'>
				Thoughts? Suggestions? Bugs? Let me know.
			</Box>
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
					onChange={({ target: { value } }) => handleChange(value)}
				/>
				<Flex w='100%' marginTop={2} justifyContent='flex-end'>
					<Button disabled={!body.trim()} type='submit'>
						Submit
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

export default Email;
