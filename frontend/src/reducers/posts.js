import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.page,
        numberOfPages: action.payload.numberOfPages
      };
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post) => post.id !== action.payload);
      
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload
      };

    default:
      return state;
  }
};

export default postsReducer;