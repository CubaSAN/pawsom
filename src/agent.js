import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import qs from 'qs'

const superagent = superagentPromise(_superagent, global.Promise)

// const API_ROOT = 'http://pawsom.azurewebsites.net'
// const API_ROOT_SOCIAL = 'http://pawsomsocial.azurewebsites.net'

const API_ROOT = 'http://pawappapi.azurewebsites.net'
const API_ROOT_SOCIAL = 'http://pawappsoc.azurewebsites.net'

const responseBody = res => res.body

const requests = {
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  getAuthenticated: (url, token) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .set('Authorization', `Bearer ${token}`)
      .then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
  postAuthenticated: (url, body, token) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .then(responseBody),
  getSocial: (url, token) =>
    superagent
      .get(`${API_ROOT_SOCIAL}${url}`)
      .set('Authorization', `Bearer ${token}`)
      .then(responseBody),
  postSocial: (url, body, token) =>
    superagent
      .post(`${API_ROOT_SOCIAL}${url}`, body)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .then(responseBody),
  postSocialAuth: (url, body) =>
    superagent.post(`${API_ROOT_SOCIAL}${url}`, body).then(responseBody),
}

const Auth = {
  authorize: (accesstoken, grantType) =>
    requests.post('/auth', qs.stringify({
      accesstoken: accesstoken,
      grant_type: grantType
    })),
  authorizeSocial: (accesstoken, grantType) =>
    requests.postSocialAuth('/auth', qs.stringify({
      accesstoken: accesstoken,
      grant_type: grantType
    }))
}

const Person = {
  byEmail(email) {
    requests.get(`/api/person/byemail/${email}`)
  }
}

const Posts = {
  all: (userId, page, token) =>
    requests
      .getSocial(`/api/Post/All/${userId}/${page}`, token),
  byId: (id, token) =>
    requests
      .getSocial(`/api/Post/${id}`, token),
  addPost: (body, token) =>
    requests
      .postSocial('/api/Social/', body, token),
  deletePosts: (body, token) =>
    requests
      .postSocial('/api/DeletePost/', body, token)
}

const Comments = {
  addComment: (body, token) =>
    requests
      .postSocial('/api/Comment/', body, token),
  getComments: (postId, page, token) =>
    requests
      .getSocial(`/api/Comment/${postId}/${page}`, token)
}

const Likes = {
  setReaction: (body, token) =>
    requests
      .postSocial('/api/Reaction/', body, token)
}

const Search = {
  searchLost: (range, latitude, longitude, token) =>
    requests
      .getAuthenticated(`/api/LostPet/GetLostPet/${range}/${latitude}/${longitude}/`, token),
  addPet: (body, token) =>
    requests
      .postAuthenticated(`/api/LostPet`, body, token)
}

const User = {
  updateUser: (body, token) =>
    requests
      .postAuthenticated(`/api/person`, body, token)
}

const Pet = {
  getBreeds: (token) =>
    requests
      .getAuthenticated(`/api/Pet/Breed`, token)
}

export default {
  Person,
  Posts,
  Comments,
  Auth,
  Likes,
  Search,
  User,
  Pet
}
