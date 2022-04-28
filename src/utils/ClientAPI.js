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

  getFriendsPosts(id) {
    console.log(id);
    return this.instance.get(`v1/posts/friendsPosts/${id}`);
  }

  getOneComment(id) {
    return this.instance.get(`v1/comments/${id}`);
  }

  updateUser(
    id,
    first_name,
    last_name,
    email,
    job,
    birthday,
    desc,
    gender,
    relationships,
    city,
    from,
    status,
  ) {
    return this.instance.put(`v1/users/${id}`, {
      userId: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      job: job,
      birthday: birthday,
      desc: desc,
      gender: gender,
      relationships: relationships,
      city: city,
      from: from,
      status: status,
    });
  }

  addFriend(id, userId) {
    return this.instance.put(`v1/users/${id}/follow`, { userId: userId });
  }

  deleteFriend(id, userId) {
    return this.instance.put(`v1/users/${id}/unfollow`, { userId: userId });
  }

  updateAvatar(id, data, config) {
    return this.instance.put(`v1/users/${id}/user-profile`, data, config);
  }

  updateAlbum(id, data, config) {
    return this.instance.put(`v1/users/${id}/user-album`, data, config);
  }

  createPost({ userId, content }) {
    return this.instance.post('v1/posts/', {
      userId: userId,
      desc: content,
    });
  }
  updatePost(id, userId, desc) {
    return this.instance.put(`v1/posts/${id}`, userId, desc);
  }

  updatePostImage(id, data, config) {
    return this.instance.put(`v1/posts/${id}/post-image`, data, config);
  }

  deletePost(id, userId) {
    return this.instance.delete(`v1/posts/${id}`, userId);
  }
}

export default new ClientAPI();
