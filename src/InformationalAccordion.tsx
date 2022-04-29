import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel
} from '@chakra-ui/react';
import React from 'react';

const InformationalAccordion = (): React.ReactElement => {
	return (
		<Accordion fontSize='sm' allowToggle w='85vw'>
			<AccordionItem>
				<AccordionButton display='flex' justifyContent='space-between'>
					<h2>Tips</h2>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quasi, eligendi tenetur. Voluptas sequi aut itaque eius! Eos
					dicta tempora fugiat inventore. Accusantium deserunt,
					quisquam reiciendis molestiae labore quae officiis laborum.
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<AccordionButton display='flex' justifyContent='space-between'>
					<h2>About</h2>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quasi, eligendi tenetur. Voluptas sequi aut itaque eius! Eos
					dicta tempora fugiat inventore. Accusantium deserunt,
					quisquam reiciendis molestiae labore quae officiis laborum.
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default InformationalAccordion;
