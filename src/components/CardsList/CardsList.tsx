import React from 'react';
import { RobotDetails } from '../../containers/App/App.types';
import {Card} from '../Card/Card'

export const CardsList: React.FC<{robotsList: RobotDetails[]}> = ({robotsList}) => {
	return (
		<div>
			{
				robotsList.map(({...otherRobotProps}, idx) => (
					<Card
						key={idx} 
						id={idx}
						{...otherRobotProps}
					/>
				))
			}
		</div>
	)
}