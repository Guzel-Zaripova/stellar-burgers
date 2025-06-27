import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, ProtectedRoute } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '@store';
import { checkUserAuth, fetchIngredients } from '@slices';
import {
  IngredientDetailsWrapper,
  OrderInfoWrapper
} from '../detail-page-wrapper';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isPublic>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isPublic>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfoWrapper />} />
        <Route path='/ingredients/:id' element={<IngredientDetailsWrapper />} />
        <Route path='/profile/orders/:number' element={<OrderInfoWrapper />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={
                  orderNumber
                    ? `#${orderNumber.padStart(6, '0')}`
                    : 'Детали заказа'
                }
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={
                    orderNumber
                      ? `#${orderNumber.padStart(6, '0')}`
                      : 'Детали заказа'
                  }
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
