import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { setSearchQuery } from '../../redux/actions';

type SearchBoxProps = {
    searchQuery?: string
    setSearchQuery?: (parameter: ChangeEvent<HTMLInputElement>) => void
}
const SearchBox: React.FC<SearchBoxProps> = ({searchQuery, setSearchQuery}) => (
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


const mapStateToProps: any = (state: any) => ({
    searchQuery: state.searchRobots.searchQuery,
})

const mapDispatchToProps: any = (dispatch: any) => ({
    setSearchQuery: (event: ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);