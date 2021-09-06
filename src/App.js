import { Switch, Redirect } from 'react-router';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import authSelectors from './redux/auth/auth-selectors';

const AppBar = React.lazy(() =>
  import('./components/AppBar/AppBar.js' /* webpackChunkName: "AppBar" */),
);

const HomeView = React.lazy(() =>
  import('./views/HomeViews.js' /* webpackChunkName: "Home" */),
);

const Contacts = React.lazy(() =>
  import('./components' /* webpackChunkName: "Contacts" */),
);

const Register = React.lazy(() =>
  import('./views/RegisterViews.js' /* webpackChunkName: "Register" */),
);

const Login = React.lazy(() =>
  import('./views/LoginViews.js' /* webpackChunkName: "Login" */),
);

const App = () => {
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser,
  );
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authOperations.fetchCurrentUser());
  }, [dispath]);

  return (
    !isFetchingCurrentUser && (
      <Suspense fallback={<h1>Loading...</h1>}>
        <>
          <AppBar />

          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>

            <PublicRoute path="/register" restricted>
              <Register />
            </PublicRoute>

            <PublicRoute path="/login" redirectTo="/contacts" restricted>
              <Login />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectTo="/login">
              <Contacts />
            </PrivateRoute>

            <Redirect to="/" />
          </Switch>
        </>
      </Suspense>
    )
  );
};

export default App;
