import {
	Button,
	ButtonGroup,
	Flex,
	List,
	ListItem,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverFooter,
	PopoverTrigger,
	Text
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../App.utility';

const texts = [
	{
		title: "Apostle's Creed",
		content: `I believe in God, the Father almighty, Creator of heaven and
			earth, and in Jesus Christ, his only Son, our Lord, who was
			conceived by the Holy Spirit, born of the Virgin Mary, suffered
			under Pontius Pilate, was crucified, died and was buried; he
			descended into hell; on the third day he rose again from the
			dead; he ascended into heaven, and is seated at the right hand
			of God the Father almighty; from there he will come to judge the
			living and the dead. I believe in the Holy Spirit, the holy
			catholic Church, the communion of saints, the forgiveness of
			sins, the resurrection of the body, and life everlasting. Amen.`,
		uuid: '00000000-0000-0000-0000-000000000001'
	},
	{
		title: 'Star Spangled Banner',
		content: `O! say, can you see, by the dawn's early light, What so proudly
			we hailed at the twilight's last gleaming: Whose broad stripes
			and bright stars through the perilous fight, O'er the ramparts
			we watched were so gallantly streaming, And the rocket's red
			glare, the bombs bursting in air, Gave proof through the night
			that our flag was still there; O! say, does that Star-spangled
			Banner yet wave O'er the land of the free and the home of the
			brave?`,
		uuid: '00000000-0000-0000-0000-000000000002'
	},
	{
		title: 'Miranda Rights',
		content: `You have the right to remain silent. Anything you say can and
			will be used against you in a court of law. You have a right to
			an attorney. If you cannot afford an attorney, one will be
			appointed for you.`,
		uuid: '00000000-0000-0000-0000-000000000003'
	}
];

const Texts = (): React.ReactElement => {
	const popoverRef = useRef<any>(null);
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
	const [confirm, setConfirm] = useState<boolean>(false);
	const { value: context, setter: setContext } = useContext(AppContext);
	const [currentUuid, setCurrentUuid] = useState<string>('');

	useEffect(() => {
		if (currentUuid && confirm) {
			const text = texts.find(({ uuid }) => uuid === currentUuid);
			if (text) {
				setContext((prev) => ({
					...prev,
					index: 0,
					guesses: [],
					gameState: 'PENDING',
					currentUuid: currentUuid,
					targetText: text.content
						.replaceAll(/(\t)/g, '')
						.replaceAll(/\n/g, ' '),
					targetTextWords: text.content.split(/\s+/).filter(Boolean)
				}));
				window.scrollTo({ top: 0, behavior: 'smooth' });
				setConfirm(false);
				setCurrentUuid('');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUuid, confirm]);

	const handleClick = (uuid: string): void => {
		setCurrentUuid(uuid);
		if (context.targetText?.trim()) {
			setIsPopoverOpen(true);
		} else {
			setConfirm(true);
		}
	};

	const handleCancel = (): void => {
		setIsPopoverOpen(false);
		setConfirm(false);
		setCurrentUuid('');
	};

	const handleConfirm = (): void => {
		setConfirm(true);
		setIsPopoverOpen(false);
	};

	return (
		<Flex flexDirection='column' fontSize='sm' alignItems='flex-start'>
			<Text>Wanna try? Click one to start.</Text>
			<List maxW='80vw'>
				<Popover
					closeOnBlur
					placement='top-start'
					isOpen={isPopoverOpen}
					initialFocusRef={popoverRef}
				>
					{texts.map(({ title, content, uuid }) => {
						return (
							<PopoverTrigger key={uuid}>
								<ListItem
									ref={popoverRef}
									my={3}
									cursor='pointer'
									overflow='hidden'
									textOverflow='ellipsis'
									onClick={() => handleClick(uuid)}
								>
									<strong>{title}:</strong> {content}
								</ListItem>
							</PopoverTrigger>
						);
					})}
					<PopoverContent>
						<PopoverBody>
							You are already working on something. Do you want to
							wipe it out?
						</PopoverBody>
						<PopoverFooter>
							<ButtonGroup size='sm'>
								<Button onClick={handleCancel}>
									Never mind
								</Button>
								<Button onClick={() => handleConfirm()}>
									Yes
								</Button>
							</ButtonGroup>
						</PopoverFooter>
					</PopoverContent>
				</Popover>
			</List>
		</Flex>
	);
};

export default Texts;
