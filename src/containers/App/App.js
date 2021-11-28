import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CardsList } from "../../components/CardsList/CardsList";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Scroll from "../../components/Scroll/Scroll";
import SearchBox from "../../components/SearchBox/SearchBox";
import { requestRobots } from "../../redux/actions";
import './App.css'

const App = ({searchQuery, robotsList, onRequestRobots, isPending, error}) => {

	useEffect(() => {
        onRequestRobots();
    }, [onRequestRobots]);

    if(isPending) {
        return <h1>Loading</h1>
    }

    if(error) {
        console.log(error)
        return <h1>Something went wrong</h1>
    }

    let filteredRobotList = robotsList.filter(robot => robot.username.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

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
    )
}

const mapStateToProps = state => ({
    searchQuery: state.searchRobots.searchQuery,
    robotsList: state.requestRobots.robotsList,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
})

const mapDispatchToProps = (dispatch) => ({
    onRequestRobots: () => dispatch(requestRobots())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);