import { request } from './api';
import { getToken } from './token';

const signUp = ({ name, avatarFile, email, password }) => {
  const fd = new FormData();
  fd.append('name', name);
  fd.append('email', email);
  fd.append('password', password);

  if (avatarFile) fd.append('avatar', avatarFile);

  return request('signup', {
    method: 'POST',
    body: fd,
  });
};

const signIn = ({ email, password }) => {
  return request('signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

const getUserInfo = (token) => {
  return request('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = ({ name, avatar }) => {
  const token = getToken();
  return request('users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export { signUp, signIn, updateUser, getUserInfo };
