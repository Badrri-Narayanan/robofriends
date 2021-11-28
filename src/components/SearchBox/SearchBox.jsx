import React from 'react';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../redux/actions';

const SearchBox = ({searchQuery, setSearchQuery}) => (
    <div className="pa2">
        <input 
            className="pa3 ba b--green bg-lightest-blue"
            value={searchQuery}
            type="search"
            onChange={setSearchQuery}
            placeholder="search robots"
        />
    </div>
)


const mapStateToProps = state => ({
    searchQuery: state.searchRobots.searchQuery,
})

const mapDispatchToProps = (dispatch) => ({
    setSearchQuery: (event) => dispatch(setSearchQuery(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);