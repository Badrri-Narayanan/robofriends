import { AnyAction, applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { requestRobots, searchRobots } from './reducers';

const rootReducer = combineReducers({ searchRobots, requestRobots });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const createAppStore = () => {
  const middleware: Middleware[] = [thunkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }
  return createStore(rootReducer, applyMiddleware(...middleware));
};
