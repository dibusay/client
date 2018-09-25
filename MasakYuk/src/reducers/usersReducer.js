const initialState = {
  loading: false,
  loadingFavourite: false,
  data: null,
  favourites: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'GET_USER':
      console.log('GET_USER', action.payload)
      return {
        ...state,
        loading: false,
        data: action.payload,
        favourites: action.payload.favourites
      }
    case 'GET_USER_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'ADD_FAVOURITE_TO_USER':
      console.log('current state', state)
      console.log('ADD_FAVOURITE', action.payload)
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