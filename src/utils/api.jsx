import { getToken } from './token';

const apiBase =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? 'http://localhost:3002' : undefined);

if (!apiBase) {
  throw new Error('Missing VITE_API_BASE_URL (required in production)');
}

async function checkResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.ok) return data;
  throw new Error(data.message || `HTTP ${res.status}`);
}

const request = (url, options) => {
  return fetch(`${apiBase}/${url}`, options).then(checkResponse);
};

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getItems = () => {
  const token = getToken();
  return request('items', {
    headers: {
      ...authHeaders(),
    },
  });
};

const hideDefaultItem = (seedId) => {
  return request(`users/me/hidden-default-items/${seedId}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
    },
  });
};

const unhideDefaultItem = (seedId) => {
  return request(`users/me/hidden-default-items/${seedId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
};

const addItem = ({ name, imageUrl, weather }) => {
  return request(`items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

const deleteCard = (cardId) => {
  const token = getToken();
  return request(`items/${cardId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
};

const addCardLike = (cardId) => {
  return request(`items/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
    },
  });
};

const removeCardLike = (cardId) => {
  return request(`items/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
};

export {
  request,
  checkResponse,
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
  hideDefaultItem,
  unhideDefaultItem,
};
