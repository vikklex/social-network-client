import axios from 'axios';
import { storage } from '../storage';

class ClientAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      responseType: 'json',
    });
    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = storage.accessToken.Get();
      return config;
    });
  }

  login({ email, password_hash }) {
    return this.instance.post('/v1/auth/login', {
      email: email,
      password_hash: password_hash,
    });
  }

  register({ first_name, last_name, email, password_hash }) {
    return this.instance.post('/v1/auth/registration', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password_hash,
    });
  }

  logout() {
    return this.instance.post('/v1/auth/logout');
  }

  searchUser(username) {
    return this.instance.get(`/v1/users/search/search?username=${username}`);
  }

  getUser(id) {
    return this.instance.get(`/v1/users/${id}`);
  }

  getUserPosts(id) {
    return this.instance.get(`v1/posts/timeline/${id}`);
  }

  updateUser(data, id) {
    return this.instance.put(`v1/users/${id}`, {
      userId: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password_hash,
      job: data.job,
      birthday: data.birthday,
      desc: data.desc,
      gender: data.gender,
      relationships: data.relationships,
      city: data.city,
      from: data.from,
    });
  }

  createPost({ userId, content }) {
    return this.instance.post('v1/posts/', {
      userId: userId,
      desc: content,
    });
  }
}

export default new ClientAPI();
