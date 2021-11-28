import React from 'react';
import {Card} from '../Card/Card'

export const CardsList = ({robotsList}) => {
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