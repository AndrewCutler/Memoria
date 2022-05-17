import { createContext, SetStateAction } from 'react';

export const MAX_LENGTH = 1000;

export const isValidKestroke = (key: string) => key.match(/\w/);

export type GameState = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export interface IAppContext {
	gameState: GameState;
	targetText: string;
	guesses: boolean[];
	targetTextWords: string[];
	index: number;
	currentUuid: string;
}

export const appContext: IAppContext = {
	gameState: 'PENDING',
	targetText: '',
	guesses: [],
	targetTextWords: [],
	index: 0,
	currentUuid: ''
};

interface IContext {
	value: IAppContext;
	setter: React.Dispatch<SetStateAction<IAppContext>>;
}

export const AppContext = createContext<IContext>({
	value: appContext,
	setter: (value: SetStateAction<IAppContext>) => {}
});

export const darkModeAlternateGray = 'gray.600';

export const lightModeAlternateGray = 'gray.200';
