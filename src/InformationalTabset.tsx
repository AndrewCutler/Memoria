import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useColorModeValue
} from '@chakra-ui/react';
import React from 'react';

const InformationalTabset = (): React.ReactElement => {
	const borderColor = useColorModeValue(
		'var(--chakra-colors-gray-200)',
		'var(--chakra-colors-whiteAlpha-300)'
	);

	return (
		<Tabs
			// position='absolute'
			// bottom='150px'
			fontSize='sm'
			w='85vw'
			border={`1px solid ${borderColor}`}
			borderRadius='5px'
		>
			<TabList>
				<Tab>Tips</Tab>
				<Tab>About</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
					sit culpa vel quasi magnam esse inventore possimus, cum
					earum, magni fuga numquam amet ullam iure sint, accusantium
					aut quos iste!
				</TabPanel>
				<TabPanel>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Facere qui, totam repellat possimus voluptates consequuntur
					officiis excepturi. Alias dolorum consectetur aliquam vitae
					illum! Veniam, maiores. Ad, nulla dolor? Quam voluptates
					aliquam blanditiis eaque explicabo, vel perferendis impedit
					repellendus ratione, dicta doloremque quo tempore non porro
					eum libero sit natus corporis quos veniam itaque velit?
					Incidunt laboriosam unde saepe quos alias.
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default InformationalTabset;
