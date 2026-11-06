import { describe, expect, it } from 'vitest';
import searchReducer, { setSearchQuery } from './searchSlice';

describe('search slice', () => {
  it('starts with an empty query', () => {
    expect(searchReducer(undefined, { type: '@@INIT' })).toEqual({ searchQuery: '' });
  });

  it('stores the search query', () => {
    expect(searchReducer(undefined, setSearchQuery('bre'))).toEqual({ searchQuery: 'bre' });
  });
});
