const favourites = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FAVOURITES':
            return [
                ...state, {
                    id: action.item.char_id,
                    name: action.item.name,
                    img: action.item.img,
                    isFavourite: true
                }
            ]

        case 'REMOVE_FAVOURITES':
            return state.filter((item, index) => item.id !== action.id);

        default:
            return state
    }
}

export default favourites;