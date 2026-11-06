import { useEffect } from 'react';
import { CardsList } from '../../components/CardsList/CardsList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Scroll from '../../components/Scroll/Scroll';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchRobots } from '../../redux/robotsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { robotsList, isPending, error } = useAppSelector((state) => state.robots);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch]);

  if (isPending) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Something went wrong</h1>;
  }

  const query = searchQuery.toLowerCase();
  const filteredRobotList = robotsList.filter((robot) =>
    robot.username.toLowerCase().includes(query)
  );

  return (
    <div className="tc">
      <h1>RoboFriends</h1>
      <SearchBox />
      <Scroll>
        <ErrorBoundary>
          <CardsList robotsList={filteredRobotList} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default App;
