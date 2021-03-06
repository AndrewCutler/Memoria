import { Divider, Box, Link, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const About = (): React.ReactElement => (
	<>
		<Text>
			Did you know that memorizing stuff is good for your brain? While
			your brain is technically <i>not</i> a muscle, it still likes to be
			exercised.
		</Text>
		<Text>
			This site was originally created to help memorize Bible verses, but
			can be used for any structured texts: movie scripts, poetry, lyrics.
		</Text>
		<Box>
			According to the{' '}
			<Link href='https://www.newadvent.org/summa/3049.htm' isExternal>
				great medieval philosopher St. Thomas Aquinas
			</Link>
			, there are four important aspects to memorization:
		</Box>
		<Flex justifyContent='center'>
			<ul style={{ textAlign: 'initial', maxWidth: '550px' }}>
				<li>
					we should take some suitable yet somewhat unwonted
					illustration of it,
				</li>
				<li>
					we should carefully consider and set in order, so that we
					may pass easily from one memory to another,
				</li>
				<li>
					we should be anxious and earnest about the things we wish to
					remember, because the more a thing is impressed on the mind,
					the less it is liable to slip out of it, and,
				</li>
				<li>
					we should often reflect on the things we wish to remember,
				</li>
			</ul>
		</Flex>
		<Box>
			Above all, like everyhing else in life, the most vital way to
			improve is with{' '}
			<Link
				href='https://awaken.com/2012/07/in-praise-of-memorization-10-proven-brain-benefits/'
				isExternal
			>
				a balanced diet, healthy lifestyle, and regular exercise.
			</Link>
		</Box>
	</>
);

export const Tips = (): React.ReactElement => (
	<Box>
		<Text fontWeight='700' fontSize='md'>
			<Link
				href='https://www.brainscape.com/academy/why-rote-memorization-is-more-important-than-you-think/'
				isExternal
			>
				How should this site be used?
			</Link>
		</Text>
		<Flex justifyContent='center'>
			<ul style={{ textAlign: 'initial' }}>
				<li>Be attentive when you study</li>
				<li>Actively recall what you are trying to remember</li>
				<li>Space out your practice sessions</li>
			</ul>
		</Flex>
		<Divider my={2} />
		<Text>
			Keep this in mind:{' '}
			<strong>
				just because it's rote memorization, doesn't mean it should only
				be done by rote.
			</strong>{' '}
			Engage your brain!
		</Text>
	</Box>
);

export const Support = (): React.ReactElement => (
	<Box mb={0}>
		<Link href='https://ko-fi.com/andrewcutler' isExternal>
			Buy me a coffee?
		</Link>{' '}
		??????
	</Box>
);
