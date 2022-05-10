import React, { useContext, useEffect } from 'react';
import { AppContext, IAppContext } from '../App.utility';

const ActionButtons = (): React.ReactElement => {
	const { value: context, setter: setContext } = useContext(AppContext);

	useEffect(() => {
		console.log(context);
	}, [context]);

	const handleClick = (): void => {
		setContext((prev) => ({ ...prev, gameState: 'IN PROGRESS' }));
		// context.setContext;
	};

	return <button onClick={handleClick}>hi</button>;
};

export default ActionButtons;
