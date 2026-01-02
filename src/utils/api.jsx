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

const getItems = () => {
  return request(`items`);
};

const addItem = ({ name, imageUrl, weather }, token) => {
  return request(`items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

const deleteCard = (cardId) => {
  const token = getToken();
  return request(`items/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (cardId, token) => {
  return request(`items/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeCardLike = (cardId, token) => {
  return request(`items/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
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
};
