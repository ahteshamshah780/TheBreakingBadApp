import { combineReducers } from 'redux';
import favourites from './favourites';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
    favourites,
    visibilityFilter
})