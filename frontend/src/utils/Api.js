const token = localStorage.getItem('token');
const configApi = {
  url: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

const configAuthApi = {
  url: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",

  }
}
class Api {
  constructor(configApi) {
    this._url = configApi.url
    this._headers = configApi.headers
  }

  _checkResponse(item) {
    return item.then(item => {
      if (item.ok) {
        return item.json()
      }
      return Promise.reject(`${item.status}`)
    })
  }

  getTasks() {
    const card = fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    return this._checkResponse(card)
  }

  getInfoUser() {

    const infoUSer = fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    return this._checkResponse(infoUSer)
  }

  saveInfoUser(name, about) {
    const saveInfoUser = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, about
      })
    })
    return this._checkResponse(saveInfoUser)
  }

  creatCard(name, link) {
    const creatCard = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    return this._checkResponse(creatCard)
  }

  deleteCard(id) {

    const deleteCard = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    return this._checkResponse(deleteCard)
  }

  addLike(id) {
    const addLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    return this._checkResponse(addLike)
  }

  deleteLike(id) {

    const addLike = fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    return this._checkResponse(addLike)
  }

  updateAvatar(avatar) {
    const updateAvatar = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    })
    return this._checkResponse(updateAvatar)
  }
}

class AuthApi {
  constructor(configAuthApi) {
    this.url = configAuthApi.url
    this.headers = configAuthApi.headers
  }
  _checkResponse(item) {
    return item.then(item => {
      if (item.ok) {
        return item.json()
      }
      return Promise.reject(`${item.status}`)
    })
  }

  registerUser(email, password) {
    const registerUser = fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password })
    })
    return this._checkResponse(registerUser)
  }
  // получаем токен пользовтеля
  tokenUser(email, password) {
    const tokenUser = fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,

      body: JSON.stringify({ email, password }),
    })
    return this._checkResponse(tokenUser)
  }
  // проверяем токен пользовтеля
  getToken() {
    const token = localStorage.getItem('token');
    const getToken = fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    return this._checkResponse(getToken)
  }
}

const dataApi = new Api(configApi)
const dataAuthApi = new AuthApi(configAuthApi)

export { dataApi, dataAuthApi }  