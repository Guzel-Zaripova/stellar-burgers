import { selectIsAuthChecked, selectUser } from '@slices';
import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isPublic,
  children
}) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const { from } = location.state || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
