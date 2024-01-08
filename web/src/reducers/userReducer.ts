const initialState = {
  user: null as null | { 
    email: string;
  },
};

type UserAction = {
  type: 'SET_USER';
  payload: { email: string; };
} | {
  type: 'LOGOUT';
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER':

      localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
