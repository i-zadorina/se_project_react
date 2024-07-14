const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`
  //   ,{
  //   headers: {
  //     "Content-Type": "application/json", 
  //   }
  // }
  ).then(checkResponse);
}

function createCard({ name, imageUrl, weather }) {
  console.log(name, imageUrl, weather);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  }).then(checkResponse);
}

export { getItems, createCard, deleteCard, checkResponse };
