// userReducer.js
const initialState = {
  user: null as null | { // Dit geeft aan dat 'user' null kan zijn of een object met bepaalde eigenschappen.
    email: string;
    name: string;
    phoneNumber: string;
    // Voeg andere eigenschappen toe op basis van je gebruikersgegevens
  },
};

type UserAction = {
  type: 'SET_USER';
  payload: { email: string; name: string; phoneNumber: string; /* andere eigenschappen */ };
} | {
  type: 'LOGOUT';
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER':
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
