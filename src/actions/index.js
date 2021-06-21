import { ADD_FAVOURITES, REMOVE_FAVOURITES } from './actionTypes';

export const addFavourites = (item) => ({
    type: ADD_FAVOURITES,
    item
})

export const removeFavourites = (id) => ({
    type: REMOVE_FAVOURITES,
    id
})