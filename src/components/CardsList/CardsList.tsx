import React from 'react';
import { RobotDetails } from '../../containers/App/App.types';
import { Card } from '../Card/Card';

export const CardsList: React.FC<{ robotsList: RobotDetails[] }> = ({ robotsList }) => (
	<div>
		{robotsList.map(({ id, username, email }) => (
			<Card key={id} id={id} username={username} email={email} />
		))}
	</div>
);
