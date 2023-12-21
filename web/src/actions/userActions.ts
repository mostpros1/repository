type UserData = {
  email: string;
  name: string;
  phoneNumber: string;
};

export const setUser = (user: UserData) => ({
  type: 'SET_USER' as const,
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT' as const,
});
