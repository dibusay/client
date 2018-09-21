const initialState = {
  loading: false,
  loadingFavourite: false,
  data: null,
  favourites: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_USER':
    case 'LOADING_FAVOURITE':
      return {
        ...state,
        loadingFavourite: true
      }
    case 'ADD_FAVOURITE_TO_USER':
      return {
        ...state,
        loadingFavourite: false,
        data: action.payload,
        favourites: action.payload.favourites
      }
    case 'REMOVE_FAVOURITE_FROM_USER':
      return {
        ...state,
        loadingFavourite: false,
        data: action.payload,
        favourites: action.payload.favourites
      }
    default: return state
  }
}