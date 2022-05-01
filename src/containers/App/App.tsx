import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CardsList } from "../../components/CardsList/CardsList";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Scroll from "../../components/Scroll/Scroll";
import SearchBox from "../../components/SearchBox/SearchBox";
import { requestRobots } from "../../redux/actions";
import { RobotDetails  } from "./App.types";
import './App.css'

type AppProps = {
    searchQuery?: string
    robotsList?: RobotDetails[]
    onRequestRobots?: Function
    isPending?: boolean
    error?: any
}

const App: React.FC<AppProps> = ({searchQuery, robotsList, onRequestRobots, isPending, error}) => {

	useEffect(() => {
        onRequestRobots && onRequestRobots();
    }, [onRequestRobots]);

    if(isPending) {
        return <h1>Loading</h1>
    }

    if(error) {
        console.log(error)
        return <h1>Something went wrong</h1>
    }

    let validSearchQuery = searchQuery !== undefined ? searchQuery : ''

    let filteredRobotList = robotsList !== undefined 
                ? robotsList.filter(robot => robot.username.toLowerCase().includes( validSearchQuery.toLocaleLowerCase()))
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

const mapStateToProps: any = (state: any) => ({
    searchQuery: state.searchRobots.searchQuery,
    robotsList: state.requestRobots.robotsList,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
})

const mapDispatchToProps: any = (dispatch: any) => ({
    onRequestRobots: () => dispatch(requestRobots())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);