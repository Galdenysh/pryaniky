import { Route, Routes } from 'react-router';
import Header from '../header/header';
import ProtectedRoute from '../protected-route/protected-route';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import { links } from '../../utils/constants';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../hooks/useCurrentUser';
import { getWithExpiry } from '../../utils/localstorage';

function App() {
  const [currentUser, setCurrentUser] = useState({
    username: '',
    loggedIn: false,
  });

  useEffect(() => {
    const userName = getWithExpiry('user');

    if (userName) {
      setCurrentUser({
        username: userName,
        loggedIn: true,
      })
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Header />
      <Routes>
        <Route
          path={links.login}
          element={
            <ProtectedRoute anonymous={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={links.main}
          element={
            <ProtectedRoute anonymous={false}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
