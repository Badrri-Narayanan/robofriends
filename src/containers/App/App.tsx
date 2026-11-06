import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CardsList } from "../../components/CardsList/CardsList";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Scroll from "../../components/Scroll/Scroll";
import SearchBox from "../../components/SearchBox/SearchBox";
import { requestRobots } from "../../redux/actions";
import { AppDispatch, RootState } from "../../redux/store";
import { RobotDetails } from "./App.types";
import './App.css'

type AppProps = {
    searchQuery?: string
    robotsList?: RobotDetails[]
    onRequestRobots?: () => void
    isPending?: boolean
    error?: string
}

const App: React.FC<AppProps> = ({searchQuery, robotsList, onRequestRobots, isPending, error}) => {

	useEffect(() => {
        onRequestRobots && onRequestRobots();
    }, [onRequestRobots]);

    if(isPending) {
        return <h1>Loading</h1>
    }

    if(error) {
        console.error(error)
        return <h1>Something went wrong</h1>
    }

    let validSearchQuery = searchQuery !== undefined ? searchQuery : ''

    let filteredRobotList = robotsList !== undefined 
                ? robotsList.filter(robot => robot.username.toLowerCase().includes( validSearchQuery.toLowerCase()))
                : []

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

const mapStateToProps = (state: RootState) => ({
    searchQuery: state.searchRobots.searchQuery,
    robotsList: state.requestRobots.robotsList,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    onRequestRobots: () => dispatch(requestRobots())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);