const initialState = {
  loading: false,
  data: null,
  isFavourite: false
}

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_FAVOURITE:
      console.log('Reducer: Fetch_Favourite From DB ->')
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    default: return state
  }
}

