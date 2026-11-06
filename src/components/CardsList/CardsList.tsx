import { RobotDetails } from '../../redux/types';
import { Card } from '../Card/Card';

export const CardsList = ({ robotsList }: { robotsList: RobotDetails[] }) => (
	<div>
		{robotsList.map(({ id, username, email }) => (
			<Card key={id} id={id} username={username} email={email} />
		))}
	</div>
);
