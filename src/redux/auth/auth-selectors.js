const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserEmail = state => state.auth.user.email;

const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getIsFetchingCurrentUser,
};

export default authSelectors;
