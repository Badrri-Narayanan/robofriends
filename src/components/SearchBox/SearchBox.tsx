import { setSearchQuery } from '../../redux/searchSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  return (
    <div className="pa2">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        value={searchQuery}
        type="search"
        aria-label="Search robots"
        onChange={(event) => dispatch(setSearchQuery(event.target.value))}
        placeholder="search robots"
      />
    </div>
  );
};

export default SearchBox;
