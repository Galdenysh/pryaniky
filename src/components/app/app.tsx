import { Route, Routes } from 'react-router';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Header from '../header/header';
import ProtectedRoute from '../protected-route/protected-route';
import { links } from '../../utils/constants';
import NotFound from '../../pages/not-found/not-found';

function App() {
  return (
    <>
      <Header></Header>
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
    </>
  );
}

export default App;
