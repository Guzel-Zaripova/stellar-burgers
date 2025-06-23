import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
