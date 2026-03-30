import axios from "axios";

const api = axios.create({
  baseURL: 'https://localhost:3000/api/auth',
  withCredentials: true
})

export async function signUp({username, email, password}) {
  
  try {
    const response = api.post('/signup', {
      username, email, password
    })

    return response.data

  } catch (error) {
    console.error(error);
  }
  
}

export async function login({ email, password }) {
  try {
    const response = await api.post('/login', {
      email, password
    })

    return response.data

  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const response = await api.get('/logout')

    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getMe() {
  try {
    const response = await api.get('/get-me')

    return response.data

    return response.data
  } catch (error) {
    console.error(error);
  }
}